import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function Sequence() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const runSequence = () => {
    translateX.value = 0;
    translateY.value = 0;
    translateX.value = withSequence(
      withTiming(80, { duration: 400 }),
      withTiming(80, { duration: 400 }),
      withTiming(0, { duration: 400 }),
    );
    translateY.value = withSequence(
      withTiming(0, { duration: 400 }),
      withTiming(-60, { duration: 400 }),
      withTiming(0, { duration: 400 }),
    );
  };

  const reset = () => {
    translateX.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(0, { duration: 200 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Right → Up → Back home 🔄
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
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
          <Text className="text-2xl">📦</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runSequence}
          className="rounded-2xl bg-violet-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            ▶️ Run sequence
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
