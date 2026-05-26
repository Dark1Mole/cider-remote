import { MiniPlayer } from "@/src/components/MiniPlayer";
import { useConnectionStore } from "@/src/stores/connectionStore";
import { usePlaybackStore } from "@/src/stores/playbackStore";
import { CommonActions } from "@react-navigation/native";
import { Tabs } from "expo-router";
import { Platform, View } from "react-native";
import { BottomNavigation, Icon, useTheme } from "react-native-paper";

export default function TabLayout() {
  const theme = useTheme();
  const connected = useConnectionStore((s) => s.connected);
  const nowPlaying = usePlaybackStore((s) => s.nowPlaying);
  const state = usePlaybackStore((s) => s.state);
  const togglePlayPause = usePlaybackStore((s) => s.togglePlayPause);
  const next = usePlaybackStore((s) => s.next);

  return (
    <Tabs
      tabBar={({ navigation, state: navState, descriptors, insets }) => (
        <View>
          <MiniPlayer
            track={nowPlaying}
            isPlaying={state === "playing"}
            onToggle={togglePlayPause}
            onNext={next}
            visible={connected && !!nowPlaying}
          />
          <BottomNavigation.Bar
            navigationState={navState}
            safeAreaInsets={insets}
            inactiveColor={theme.colors.onSurface}
            style={{ backgroundColor: theme.colors.surface }}
            onTabPress={({ route, preventDefault }) => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (event.defaultPrevented) preventDefault();
              else navigation.dispatch({ ...CommonActions.navigate(route.name, route.params), target: navState.key });
            }}
            renderIcon={({ route, focused, color }) =>
              descriptors[route.key].options.tabBarIcon?.({ focused, color, size: 24 }) || null
            }
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              return typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : typeof options.title === "string"
                  ? options.title
                  : route.name;
            }}
          />
        </View>
      )}
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        freezeOnBlur: true,
        animation: "shift",
        tabBarStyle: Platform.select({ ios: { position: "absolute" }, default: {} }),
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({ color }) => <Icon size={24} source="home" color={color} /> }} />
      <Tabs.Screen name="library" options={{ title: "Library", tabBarIcon: ({ color }) => <Icon size={24} source="music-circle" color={color} /> }} />
      <Tabs.Screen name="now-playing" options={{ title: "Now Playing", tabBarIcon: ({ color }) => <Icon size={24} source="play-circle" color={color} /> }} />
      <Tabs.Screen name="queue" options={{ title: "Queue", tabBarIcon: ({ color }) => <Icon size={24} source="playlist-music" color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({ color }) => <Icon size={24} source="cog" color={color} /> }} />
      <Tabs.Screen name="search" options={{ href: null }} />
    </Tabs>
  );
}
