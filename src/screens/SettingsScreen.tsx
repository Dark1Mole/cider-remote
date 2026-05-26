import { Alert, View, StyleSheet } from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { AppScaffold } from "@/src/components/AppScaffold";
import { ciderAuthService } from "@/src/services/cider/CiderAuthService";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { useSettingsStore } from "@/src/stores/settingsStore";
import { spacing } from "@/src/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const { host, port, token, setHost, setPort, setToken, testConnection, connect, disconnect, savedDevices, connecting } = useConnectionStore();
  const { resetAppData, showDebugTools } = useSettingsStore();

  return (
    <AppScaffold>
      <Text variant="headlineMedium">Settings</Text>
      <TextInput label="Host" value={host} onChangeText={setHost} mode="outlined" style={styles.input} />
      <TextInput label="Port" value={String(port)} onChangeText={(v) => setPort(Number.parseInt(v, 10) || 10767)} mode="outlined" style={styles.input} />
      <TextInput label="Token" value={token ?? ""} onChangeText={setToken} mode="outlined" secureTextEntry style={styles.input} />
      <View style={styles.actions}>
        <Button mode="outlined" loading={connecting} onPress={() => ciderAuthService.requestToken()}>Request Token</Button>
        <Button mode="outlined" loading={connecting} onPress={() => testConnection()}>Test Connection</Button>
        <Button mode="contained" onPress={() => connect()}>Connect</Button>
        <Button mode="text" onPress={() => disconnect()}>Disconnect</Button>
      </View>
      <List.Section>
        <List.Subheader>Saved Devices</List.Subheader>
        {savedDevices.length === 0 ? <List.Item title="No saved devices" /> : savedDevices.map((d) => (
          <List.Item key={d.id} title={d.name} description={`${d.host}:${d.port}`} onPress={() => { setHost(d.host); setPort(d.port); }} />
        ))}
      </List.Section>
      {showDebugTools ? (
        <List.Item title="API Debug" description="Validate endpoints" onPress={() => router.push("/modals/api-debug")} left={(p) => <List.Icon {...p} icon="bug" />} />
      ) : null}
      <List.Item title="Theme" description="Dark mode (Material 3)" left={(p) => <List.Icon {...p} icon="theme-light-dark" />} />
      <Button mode="outlined" onPress={() => Alert.alert("Reset", "Clear all saved data?", [
        { text: "Cancel" },
        { text: "Reset", style: "destructive", onPress: () => resetAppData() },
      ])}>Reset App Data</Button>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  input: { marginTop: spacing.sm },
  actions: { gap: spacing.sm, marginVertical: spacing.md },
});
