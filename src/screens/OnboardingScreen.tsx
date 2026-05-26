import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { colors, spacing } from "@/src/theme";

export default function OnboardingScreen() {
  const router = useRouter();
  return (
    <AppScaffold scroll={false}>
      <View style={styles.center}>
        <Text variant="displaySmall" style={styles.title}>Cider Remote Pixel</Text>
        <Text variant="bodyLarge" style={styles.sub}>
          Control your Cider desktop player from your phone with a modern Material 3 experience.
        </Text>
        <Button mode="contained" onPress={() => router.push("/(onboarding)/connect")}>Get Started</Button>
      </View>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", gap: spacing.lg, padding: spacing.xl },
  title: { color: colors.textPrimary, textAlign: "center" },
  sub: { color: colors.textSecondary, textAlign: "center" },
});
