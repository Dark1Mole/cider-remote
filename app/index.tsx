import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import { isOnboardingComplete } from "@/src/services/storage/connectionStorage";
import { useConnectionStore } from "@/src/stores/connectionStore";

export default function Index() {
  const [ready, setReady] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const loadSavedConnection = useConnectionStore((s) => s.loadSavedConnection);

  useEffect(() => {
    (async () => {
      await loadSavedConnection();
      const complete = await isOnboardingComplete();
      setShowOnboarding(!complete);
      setReady(true);
    })();
  }, [loadSavedConnection]);

  if (!ready) return null;
  if (showOnboarding) return <Redirect href="/(onboarding)/welcome" />;
  return <Redirect href="/(tabs)" />;
}
