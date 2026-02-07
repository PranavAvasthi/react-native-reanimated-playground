import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Interruption() {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const goRight = () => {
    translateX.value = withTiming(140, { duration: 2000 });
  };

  const goLeft = () => {
    translateX.value = withTiming(0, { duration: 2000 });
  };

  const reset = () => {
    translateX.value = withTiming(0, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Tap the other button mid-animation! 🎯
      </Text>
      <View className="h-40 w-64 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#7c3aed",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🎪</Text>
        </Animated.View>
      </View>

      <View className="flex-row gap-3">
        <Pressable
          onPress={goRight}
          className="flex-1 rounded-2xl bg-violet-500 py-3"
        >
          <Text className="text-center font-medium text-white">→ Right</Text>
        </Pressable>
        <Pressable
          onPress={goLeft}
          className="flex-1 rounded-2xl bg-emerald-500 py-3"
        >
          <Text className="text-center font-medium text-white">← Left</Text>
        </Pressable>
      </View>
      <Pressable onPress={reset} className="rounded-2xl bg-slate-700 px-8 py-3">
        <Text className="font-medium text-white">Reset</Text>
      </Pressable>
    </View>
  );
}
