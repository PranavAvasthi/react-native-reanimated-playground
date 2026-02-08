import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function MultiStep() {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 0.5, 1], [0, 80, 0]),
      },
    ],
  }));

  const run = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1200 });
  };

  const reset = () => {
    progress.value = withTiming(0, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        0 → 0.5 → 1 maps to 0 → 80 → 0 (there and back) 🔄
      </Text>
      <View className="h-40 w-64 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#f43f5e",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🎾</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={run}
          className="rounded-2xl bg-rose-500 py-3"
        >
          <Text className="text-center font-medium text-white">Run</Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
