import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { ErrorBanner } from "@/src/components/ErrorBanner";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { useSettingsStore } from "@/src/stores/settingsStore";
import { spacing } from "@/src/theme";

export default function ConnectScreen() {
  const router = useRouter();
  const { host, port, token, setHost, setPort, setToken, testConnection, connect, lastError, connecting } = useConnectionStore();
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleConnect = async () => {
    setLocalError(null);
    const ok = await connect();
    if (ok) {
      await completeOnboarding();
      router.replace("/(tabs)");
    } else {
      setLocalError(lastError);
    }
  };

  return (
    <AppScaffold>
      <Text variant="headlineMedium">Connect to Cider</Text>
      <Text variant="bodyMedium">Enter your desktop Cider host and API token.</Text>
      <TextInput label="Host" value={host} onChangeText={setHost} mode="outlined" autoCapitalize="none" style={styles.input} />
      <TextInput label="Port" value={String(port)} onChangeText={(v) => setPort(Number.parseInt(v, 10) || 10767)} mode="outlined" keyboardType="number-pad" style={styles.input} />
      <TextInput label="API Token" value={token ?? ""} onChangeText={setToken} mode="outlined" secureTextEntry autoCapitalize="none" style={styles.input} />
      <ErrorBanner message={localError ?? lastError ?? ""} />
      <View style={styles.actions}>
        <Button mode="outlined" loading={connecting} onPress={() => testConnection()}>Test Connection</Button>
        <Button mode="contained" loading={connecting} onPress={handleConnect}>Connect</Button>
        <Button mode="text" onPress={() => router.push("/modals/connect-qr")}>Scan QR Code</Button>
      </View>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  input: { marginTop: spacing.sm },
  actions: { marginTop: spacing.lg, gap: spacing.sm },
});
