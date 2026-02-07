import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function DelayRepeat() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const runDelayed = () => {
    scale.value = 1;
    scale.value = withDelay(
      600,
      withSequence(
        withTiming(1.4, { duration: 400 }),
        withTiming(1, { duration: 400 }),
      ),
    );
  };

  const runRepeat = () => {
    scale.value = 1;
    scale.value = withRepeat(
      withSequence(
        withTiming(1.3, { duration: 400 }),
        withTiming(1, { duration: 400 }),
      ),
      3,
      true,
    );
  };

  const reset = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Delay = wait then go. Repeat = loop it 🔁
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#7c3aed",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">⏰</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runDelayed}
          className="rounded-2xl bg-violet-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            ⏳ Delayed (600ms wait)
          </Text>
        </Pressable>
        <Pressable
          onPress={runRepeat}
          className="rounded-2xl bg-violet-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            🔄 Repeat 3x (reverse)
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
