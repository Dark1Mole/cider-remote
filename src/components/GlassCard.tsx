import { ReactNode } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { colors, motion, radius } from "@/src/theme";

type GlassCardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
};

export function GlassCard({ children, onPress, style }: GlassCardProps) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const content = (
    <Animated.View style={[styles.card, style, animatedStyle]}>{children}</Animated.View>
  );

  if (!onPress) return content;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(motion.pressScale, motion.spring); }}
      onPressOut={() => { scale.value = withSpring(1, motion.spring); }}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glass,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
});
