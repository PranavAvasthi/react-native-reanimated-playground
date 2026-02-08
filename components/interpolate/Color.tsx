import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Color() {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ["#f43f5e", "#7c3aed", "#059669"],
    ),
  }));

  const run = () => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 1500 });
  };

  const reset = () => {
    progress.value = withTiming(0, { duration: 400 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Rose → Violet → Emerald 🌈
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-4xl">🌈</Text>
        </Animated.View>
      </View>

      <View className="flex-row gap-3">
        <Pressable onPress={run} className="rounded-2xl bg-rose-500 px-8 py-3">
          <Text className="font-medium text-white">Animate</Text>
        </Pressable>
        <Pressable
          onPress={reset}
          className="rounded-2xl bg-slate-700 px-8 py-3"
        >
          <Text className="font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
