import { Redirect, Stack } from "expo-router";

export default function OnboardingLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}

export function OnboardingIndex() {
  return <Redirect href="/(onboarding)/welcome" />;
}
