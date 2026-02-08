import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  clamp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function Clamp() {
  const raw = useSharedValue(0);

  const interpolatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(raw.value, [0, 1], [0, 120]),
      },
    ],
  }));

  const clampedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: 120 + interpolate(clamp(raw.value, 0, 1), [0, 1], [0, 40]),
      },
    ],
  }));

  const runUnclamped = () => {
    raw.value = 0;
    raw.value = withRepeat(withTiming(1.5, { duration: 1000 }), 2, true);
  };

  const reset = () => {
    raw.value = withTiming(0, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Left: interpolate (goes past 120). Right: clamped (stays in range) 📏
      </Text>
      <View className="h-40 w-72 items-center justify-center rounded-2xl bg-slate-100">
        <View className="absolute left-2 h-14 w-14 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
          <Text className="text-xl">🏁</Text>
        </View>
        <Animated.View
          style={[
            interpolatedStyle,
            {
              position: "absolute",
              left: 0,
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#0ea5e9",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-lg text-white">↔</Text>
        </Animated.View>
        <Animated.View
          style={[
            clampedStyle,
            {
              position: "absolute",
              left: 120,
              width: 48,
              height: 48,
              borderRadius: 12,
              backgroundColor: "#0284c7",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-lg text-white">⊔</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runUnclamped}
          className="rounded-2xl bg-sky-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            Run (raw 0 → 1.5)
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
