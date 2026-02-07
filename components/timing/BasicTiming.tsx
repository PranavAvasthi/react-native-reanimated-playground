import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function BasicTiming() {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const run = (duration: number) => {
    translateX.value = 0;
    translateX.value = withTiming(120, { duration });
  };

  const reset = () => {
    translateX.value = withTiming(0, { duration: 200 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Same distance, different speed ⏱️
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
          <Text className="text-2xl">🚀</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={() => run(300)}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">⚡ 300ms</Text>
        </Pressable>
        <Pressable
          onPress={() => run(800)}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🐢 800ms</Text>
        </Pressable>
        <Pressable
          onPress={() => run(1500)}
          className="rounded-2xl bg-violet-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🐌 1.5s</Text>
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
