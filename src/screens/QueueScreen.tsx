import { useEffect } from "react";
import { FlatList } from "react-native";
import { Text } from "react-native-paper";
import { AppScaffold } from "@/src/components/AppScaffold";
import { EmptyState, ErrorBanner, LoadingSkeleton } from "@/src/components/ErrorBanner";
import { QueueItem } from "@/src/components/QueueItem";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { useQueueStore } from "@/src/stores/queueStore";

export default function QueueScreen() {
  const connected = useConnectionStore((s) => s.connected);
  const { items, currentIndex, loading, error, refreshQueue, removeItem } = useQueueStore();

  useEffect(() => {
    if (connected) refreshQueue();
  }, [connected, refreshQueue]);

  return (
    <AppScaffold scroll={false}>
      <Text variant="headlineMedium">Queue</Text>
      <ErrorBanner message={error ?? ""} />
      {loading ? <LoadingSkeleton lines={5} /> : items.length === 0 ? (
        <EmptyState title="Queue is empty" subtitle={connected ? undefined : "Connect to Cider to load queue"} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => `${item.id}-${item.index}`}
          renderItem={({ item, index }) => (
            <QueueItem item={item} active={index === currentIndex} />
          )}
        />
      )}
    </AppScaffold>
  );
}
