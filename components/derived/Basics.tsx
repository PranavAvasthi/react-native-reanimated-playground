import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Basics() {
  const progress = useSharedValue(0);
  const doubleScale = useDerivedValue(() => progress.value * 2);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + progress.value }],
  }));
  const derivedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.5 + doubleScale.value * 0.25 }],
  }));

  const animate = () => {
    progress.value = withSpring(progress.value === 1 ? 0 : 1);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Top: progress. Bottom: derived (scale = progress × 2) 📐
      </Text>
      <View className="h-52 w-52 items-center justify-center gap-4 rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            progressStyle,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#0ea5e9",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl text-white">1x</Text>
        </Animated.View>
        <Animated.View
          style={[
            derivedStyle,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#0284c7",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl text-white">2x</Text>
        </Animated.View>
      </View>

      <Pressable onPress={animate} className="rounded-2xl bg-sky-500 px-8 py-3">
        <Text className="font-medium text-white">Toggle (0 ↔ 1)</Text>
      </Pressable>
    </View>
  );
}
