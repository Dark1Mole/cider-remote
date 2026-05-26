import { CiderApiClient } from "@/src/services/cider/CiderApiClient";
import {
  API_V1_FALLBACKS,
  API_V2_TESTS,
  CIDER_DEFAULT_PORT,
  CiderApiDebugResult,
  CiderApiRequest,
} from "@/src/services/cider/CiderTypes";
import { IOState } from "@/lib/io";
import { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  IconButton,
  Text,
  TextInput,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type ResultMap = Record<string, CiderApiDebugResult>;

function parseHostAddress(hostAddress: string): { host: string; port: number } {
  const trimmed = hostAddress.trim().replace(/\/+$/, "");
  const withoutProtocol = trimmed.replace(/^https?:\/\//, "");

  if (withoutProtocol.includes(":")) {
    const [host, portPart] = withoutProtocol.split(":");
    const port = Number.parseInt(portPart, 10);
    return {
      host: host || "127.0.0.1",
      port: Number.isFinite(port) ? port : CIDER_DEFAULT_PORT,
    };
  }

  return { host: withoutProtocol || "127.0.0.1", port: CIDER_DEFAULT_PORT };
}

function DebugField({
  label,
  value,
  monospace,
}: {
  label: string;
  value: string;
  monospace?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text variant="labelSmall" style={styles.fieldLabel}>
        {label}
      </Text>
      <Text
        variant="bodySmall"
        selectable
        style={monospace ? styles.mono : undefined}
      >
        {value}
      </Text>
    </View>
  );
}

function ResultCard({
  result,
  onRunV1Fallback,
  v1Fallback,
}: {
  result: CiderApiDebugResult;
  onRunV1Fallback?: () => void;
  v1Fallback?: CiderApiRequest;
}) {
  const statusColor = result.success
    ? "#4caf50"
    : result.timeoutError
      ? "#ff9800"
      : "#f44336";

  return (
    <Card style={styles.resultCard}>
      <Card.Title
        title={result.label}
        subtitle={`${result.method} ${result.path}`}
        right={() => (
          <Chip
            compact
            style={{ backgroundColor: statusColor, marginRight: 12 }}
            textStyle={{ color: "#fff" }}
          >
            {result.success ? "OK" : result.statusCode ?? "ERR"}
          </Chip>
        )}
      />
      <Card.Content>
        <DebugField label="Endpoint" value={result.endpoint} monospace />
        <DebugField label="Method" value={result.method} />
        <DebugField
          label="Request body"
          value={result.requestBody ?? "(none)"}
          monospace
        />
        <DebugField
          label="Status code"
          value={result.statusCode?.toString() ?? "—"}
        />
        <DebugField
          label="Response time"
          value={`${result.responseTimeMs} ms`}
        />
        <DebugField label="API version" value={result.apiVersion} />
        <DebugField
          label="Error code"
          value={result.errorCode ?? "—"}
        />
        <DebugField
          label="Missing scope error"
          value={result.missingScopeError ? "Yes" : "No"}
        />
        <DebugField
          label="Timeout error"
          value={result.timeoutError ? "Yes" : "No"}
        />
        {result.networkError ? (
          <DebugField label="Network error" value={result.networkError} />
        ) : null}
        <DebugField
          label="Raw JSON"
          value={result.rawJson ?? "(empty)"}
          monospace
        />
        <DebugField
          label="Parsed result"
          value={
            result.parsedResult !== null
              ? JSON.stringify(result.parsedResult, null, 2)
              : "(null)"
          }
          monospace
        />
        {!result.success && v1Fallback && onRunV1Fallback ? (
          <Button mode="outlined" onPress={onRunV1Fallback} style={styles.fallbackButton}>
            Try v1 fallback: {v1Fallback.path}
          </Button>
        ) : null}
      </Card.Content>
    </Card>
  );
}

export default function ApiDebugScreen({ onBack }: { onBack?: () => void }) {
  const initialConnection = useMemo(() => {
    const parsed = parseHostAddress(IOState.hostAddress);
    return {
      host: parsed.host,
      port: String(parsed.port),
      token: IOState.store.get(IOState.apiToken) ?? "",
    };
  }, []);

  const [host, setHost] = useState(initialConnection.host);
  const [port, setPort] = useState(initialConnection.port);
  const [token, setToken] = useState(initialConnection.token);
  const [results, setResults] = useState<ResultMap>({});
  const [running, setRunning] = useState<string | null>(null);
  const [runningAll, setRunningAll] = useState(false);

  const client = useMemo(
    () =>
      new CiderApiClient({
        host,
        port: Number.parseInt(port, 10) || CIDER_DEFAULT_PORT,
        token: token || null,
      }),
    [host, port, token]
  );

  const runTest = useCallback(
    async (request: CiderApiRequest, apiVersion: "v2" | "v1" = "v2") => {
      setRunning(request.id);
      const result = await client.runDebugRequest(request, apiVersion);
      setResults((prev) => ({ ...prev, [request.id]: result }));
      setRunning(null);
      return result;
    },
    [client]
  );

  const runAllTests = useCallback(async () => {
    setRunningAll(true);
    setResults({});

    for (const test of API_V2_TESTS) {
      await runTest(test, "v2");
    }

    setRunningAll(false);
  }, [runTest]);

  const saveConnection = useCallback(() => {
    IOState.hostAddress = client.getBaseUrl();
    IOState.store.set(IOState.apiToken, token || null);
    IOState.saveApiToken();
  }, [client, token]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {onBack ? (
          <IconButton icon="arrow-left" onPress={onBack} />
        ) : (
          <View style={styles.headerSpacer} />
        )}
        <Text variant="titleLarge" style={styles.headerTitle}>
          API Debug
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.configCard}>
          <Card.Title title="Connection" subtitle="Cider v2 — validate before building UI" />
          <Card.Content>
            <TextInput
              label="Host"
              value={host}
              onChangeText={setHost}
              mode="outlined"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
            />
            <TextInput
              label="Port"
              value={port}
              onChangeText={setPort}
              mode="outlined"
              keyboardType="number-pad"
              style={styles.input}
            />
            <TextInput
              label="API Token (apptoken header)"
              value={token}
              onChangeText={setToken}
              mode="outlined"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              style={styles.input}
            />
            <View style={styles.configActions}>
              <Button mode="outlined" onPress={saveConnection} compact>
                Save to app
              </Button>
              <Button
                mode="contained"
                onPress={runAllTests}
                loading={runningAll}
                disabled={runningAll || running !== null}
                compact
              >
                Run all v2 tests
              </Button>
            </View>
            <Text variant="bodySmall" style={styles.baseUrl}>
              Base URL: {client.getBaseUrl()}/api/v2
            </Text>
          </Card.Content>
        </Card>

        <Divider style={styles.divider} />

        {API_V2_TESTS.map((test) => {
          const result = results[test.id];
          const v1Fallback = API_V1_FALLBACKS[test.id];
          const isRunning = running === test.id;

          return (
            <View key={test.id}>
              <View style={styles.testHeader}>
                <Text variant="titleMedium">{test.label}</Text>
                <Button
                  mode="contained-tonal"
                  compact
                  loading={isRunning}
                  disabled={isRunning || runningAll}
                  onPress={() => runTest(test, "v2")}
                >
                  Run
                </Button>
              </View>
              <Text variant="bodySmall" style={styles.testPath}>
                {test.method} {test.path}
              </Text>
              {result ? (
                <ResultCard
                  result={result}
                  v1Fallback={v1Fallback}
                  onRunV1Fallback={
                    v1Fallback
                      ? () => runTest(v1Fallback, "v1")
                      : undefined
                  }
                />
              ) : (
                <Card style={styles.pendingCard}>
                  <Card.Content>
                    <Text variant="bodySmall" style={styles.pendingText}>
                      Not tested yet
                    </Text>
                  </Card.Content>
                </Card>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    height: 56,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
  },
  headerSpacer: {
    width: 48,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 12,
  },
  configCard: {
    marginBottom: 4,
  },
  input: {
    marginBottom: 8,
  },
  configActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  baseUrl: {
    opacity: 0.7,
  },
  divider: {
    marginVertical: 8,
  },
  testHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  testPath: {
    opacity: 0.7,
    marginBottom: 8,
    fontFamily: "SpaceMono",
  },
  resultCard: {
    marginBottom: 16,
  },
  pendingCard: {
    marginBottom: 16,
    opacity: 0.6,
  },
  pendingText: {
    textAlign: "center",
  },
  field: {
    marginBottom: 8,
  },
  fieldLabel: {
    opacity: 0.6,
    marginBottom: 2,
  },
  mono: {
    fontFamily: "SpaceMono",
    fontSize: 11,
  },
  fallbackButton: {
    marginTop: 8,
  },
});
