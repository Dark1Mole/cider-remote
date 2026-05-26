import { Image, StyleSheet, View } from "react-native";
import { colors, radius, shadows } from "@/src/theme";

type AlbumArtworkProps = {
  uri?: string;
  size?: number;
  rounded?: number;
};

export function AlbumArtwork({ uri, size = 280, rounded = radius.lg }: AlbumArtworkProps) {
  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: rounded }, shadows.lg]}>
      {uri ? (
        <Image source={{ uri }} style={{ width: size, height: size, borderRadius: rounded }} />
      ) : (
        <View style={[styles.placeholder, { width: size, height: size, borderRadius: rounded }]} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: "hidden" },
  placeholder: { backgroundColor: colors.surfaceHigh },
});
