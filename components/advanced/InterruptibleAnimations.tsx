import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function InterruptibleAnimations() {
  const x = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const goRight = () => {
    x.value = withTiming(120, { duration: 2000 });
  };

  const goLeft = () => {
    x.value = withTiming(0, { duration: 2000 });
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Start "Go right", then tap "Go left" before it finishes. Animation
        interrupts and goes to 0 from current position.
      </Text>

      <View className="mb-8 h-24 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            style,
            {
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#06b6d4",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl">🚀</Text>
        </Animated.View>
      </View>

      <View className="flex-row justify-center gap-4">
        <Pressable onPress={goLeft} className="rounded-xl bg-slate-600 px-6 py-3">
          <Text className="font-medium text-white">Go left</Text>
        </Pressable>
        <Pressable onPress={goRight} className="rounded-xl bg-cyan-500 px-6 py-3">
          <Text className="font-medium text-white">Go right</Text>
        </Pressable>
      </View>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          Assigning a new withTiming/withSpring to a shared value automatically
          cancels the previous animation and starts from the current value.
        </Text>
      </View>
    </View>
  );
}
