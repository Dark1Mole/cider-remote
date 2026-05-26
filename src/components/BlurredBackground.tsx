import { ImageBackground, StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import { colors } from "@/src/theme";

type BlurredBackgroundProps = {
  artworkUrl?: string;
  children?: React.ReactNode;
};

export function BlurredBackground({ artworkUrl, children }: BlurredBackgroundProps) {
  if (!artworkUrl) {
    return <View style={[styles.fallback, styles.fill]}>{children}</View>;
  }

  return (
    <ImageBackground source={{ uri: artworkUrl }} style={styles.fill} blurRadius={24}>
      <BlurView intensity={60} tint="dark" style={styles.fill}>
        <View style={styles.overlay}>{children}</View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  fallback: { backgroundColor: colors.background },
  overlay: { flex: 1, backgroundColor: colors.overlay },
});
