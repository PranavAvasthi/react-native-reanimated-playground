import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Basics() {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [0, 120]),
      },
    ],
  }));

  const animate = () => {
    progress.value = withTiming(progress.value === 1 ? 0 : 1, {
      duration: 600,
    });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Progress 0→1 maps to X 0→120 📐
      </Text>
      <View className="h-40 w-64 items-center justify-center rounded-2xl bg-slate-100">
        <View className="absolute left-4 h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300">
          <Text className="text-2xl">🏁</Text>
        </View>
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
          <Text className="text-2xl">🎯</Text>
        </Animated.View>
      </View>

      <Pressable
        onPress={animate}
        className="rounded-2xl bg-rose-500 px-8 py-3"
      >
        <Text className="font-medium text-white">Toggle (0 ↔ 1)</Text>
      </Pressable>
    </View>
  );
}
