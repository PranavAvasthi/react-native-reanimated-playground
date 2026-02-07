import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Overshoot() {
  const translateX = useSharedValue(0);

  const bouncyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const runBouncy = () => {
    translateX.value = 0;
    translateX.value = withSpring(120, { damping: 8 });
  };

  const runClamped = () => {
    translateX.value = 0;
    translateX.value = withSpring(120, {
      damping: 8,
      overshootClamping: true,
    });
  };

  const reset = () => {
    translateX.value = withSpring(0, { damping: 15 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Bouncy overshoots, clamped settles smoothly 🎯
      </Text>
      <View className="h-40 w-64 items-center justify-center rounded-2xl bg-slate-100">
        <View className="absolute left-4 h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300">
          <Text className="text-2xl">🏁</Text>
        </View>
        <Animated.View
          style={[
            bouncyStyle,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#f59e0b",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🔔</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={runBouncy}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🎈 Bouncy</Text>
        </Pressable>
        <Pressable
          onPress={runClamped}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">📐 Clamped</Text>
        </Pressable>
        <Pressable
          onPress={reset}
          className="rounded-2xl bg-slate-700 px-5 py-3"
        >
          <Text className="font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
