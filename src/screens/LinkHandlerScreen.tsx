import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { AppScaffold } from "@/src/components/AppScaffold";
import { ErrorBanner } from "@/src/components/ErrorBanner";
import { parseMusicLink } from "@/src/linkHandling/linkParser";
import { routeMusicLink, type LinkRouteResult } from "@/src/linkHandling/linkRouter";
import { ciderQueueService } from "@/src/services/cider/CiderQueueService";
import { spacing } from "@/src/theme";

export default function LinkHandlerScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ url?: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [parsed, setParsed] = useState<ReturnType<typeof parseMusicLink> | null>(null);
  const [route, setRoute] = useState<LinkRouteResult | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const url = params.url ?? (await Linking.getInitialURL()) ?? "";
        if (!url) {
          setError("No link provided");
          setLoading(false);
          return;
        }
        const link = parseMusicLink(url);
        const result = await routeMusicLink(link);
        setParsed(link);
        setRoute(result);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to parse link");
      } finally {
        setLoading(false);
      }
    })();
  }, [params.url]);

  const playOnCider = async (mode: "now" | "next" | "later") => {
    if (!parsed || parsed.platform !== "apple-music") return;
    const payload = { url: parsed.url, id: parsed.id, type: parsed.contentType };
    if (mode === "next") await ciderQueueService.addNext(payload);
    else if (mode === "later") await ciderQueueService.addLater(payload);
    else await ciderQueueService.addNext(payload);
    router.back();
  };

  const openExternal = async () => {
    if (route?.externalUrl) await Linking.openURL(route.externalUrl);
  };

  return (
    <AppScaffold>
      <Text variant="headlineMedium">Link Handler</Text>
      {loading ? <ActivityIndicator /> : null}
      <ErrorBanner message={error ?? ""} />
      {parsed ? (
        <View style={styles.block}>
          <Text>Platform: {parsed.platform}</Text>
          <Text>Type: {parsed.contentType}</Text>
          <Text selectable>{parsed.url}</Text>
        </View>
      ) : null}
      {route ? <Text variant="bodyMedium">{route.message}</Text> : null}
      <View style={styles.actions}>
        {route?.canPlayNow ? <Button mode="contained" onPress={() => playOnCider("now")}>Play now</Button> : null}
        {route?.canAddNext ? <Button mode="outlined" onPress={() => playOnCider("next")}>Add next</Button> : null}
        {route?.canAddLater ? <Button mode="outlined" onPress={() => playOnCider("later")}>Add later</Button> : null}
        {route?.externalUrl ? <Button mode="outlined" onPress={openExternal}>Open externally</Button> : null}
      </View>
    </AppScaffold>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.sm, marginVertical: spacing.md },
  actions: { gap: spacing.sm, marginTop: spacing.lg },
});
