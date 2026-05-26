import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { IconButton } from "react-native-paper";
import { motion } from "@/src/theme";

type AnimatedButtonProps = {
  icon: string;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
  children?: ReactNode;
};

export function AnimatedButton({ icon, onPress, size = 28, disabled }: AnimatedButtonProps) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(motion.pressScale, motion.spring); }}
      onPressOut={() => { scale.value = withSpring(1, motion.spring); }}
    >
      <Animated.View style={style}>
        <IconButton icon={icon} size={size} disabled={disabled} />
      </Animated.View>
    </Pressable>
  );
}

export function AnimatedPressable({ children, onPress }: { children: ReactNode; onPress: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(motion.pressScale, motion.spring); }}
      onPressOut={() => { scale.value = withSpring(1, motion.spring); }}
    >
      <Animated.View style={style}>{children}</Animated.View>
    </Pressable>
  );
}

const _styles = StyleSheet.create({});
