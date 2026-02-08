import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function ProgressDriven() {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(progress.value, [0, 1], [0.8, 1.2]) },
      { rotate: `${interpolate(progress.value, [0, 1], [0, 360])}deg` },
    ],
    opacity: interpolate(progress.value, [0, 0.5, 1], [0.5, 1, 0.5]),
  }));

  const run = () => {
    progress.value = 0;
    progress.value = withRepeat(withTiming(1, { duration: 1500 }), 2, true);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        One progress drives scale, rotate, opacity 📊
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#6366f1",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">🎯</Text>
        </Animated.View>
      </View>

      <Pressable
        onPress={run}
        className="rounded-2xl bg-indigo-500 px-8 py-3"
      >
        <Text className="font-medium text-white">Run</Text>
      </Pressable>
    </View>
  );
}
