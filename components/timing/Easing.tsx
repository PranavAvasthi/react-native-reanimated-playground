import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing as REasing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type EasingFunction,
  type EasingFunctionFactory,
} from "react-native-reanimated";

export function Easing() {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const run = (easing: EasingFunction | EasingFunctionFactory) => {
    translateX.value = 0;
    translateX.value = withTiming(120, {
      duration: 800,
      easing,
    });
  };

  const reset = () => {
    translateX.value = withTiming(0, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Same 800ms, different curves 📈
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
              backgroundColor: "#7c3aed",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🎯</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={() => run(REasing.linear)}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">Linear</Text>
        </Pressable>
        <Pressable
          onPress={() => run(REasing.ease)}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">Ease</Text>
        </Pressable>
        <Pressable
          onPress={() => run(REasing.bezier(0.68, -0.55, 0.265, 1.55))}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">Overshoot</Text>
        </Pressable>
        <Pressable
          onPress={() => run(REasing.bounce)}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">Bounce</Text>
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
