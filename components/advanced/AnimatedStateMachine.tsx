import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type State = 0 | 1 | 2; // idle, loading, success

export function AnimatedStateMachine() {
  const state = useSharedValue<State>(0);

  const style = useAnimatedStyle(() => {
    "worklet";
    const scale = state.value === 0 ? 1 : state.value === 1 ? 1.1 : 1.2;
    const opacity = state.value === 0 ? 0.7 : 1;
    const rotate = state.value === 1 ? "0deg" : state.value === 2 ? "0deg" : "0deg";
    return {
      transform: [{ scale }, { rotate }],
      opacity,
    };
  });

  const cycle = () => {
    state.value = withSequence(
      withTiming(1, { duration: 400 }),
      withTiming(2, { duration: 300 }),
      withTiming(0, { duration: 200 }),
    );
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Idle → Loading → Success. Each state has different scale/opacity.
      </Text>

      <View className="mb-8 items-center justify-center rounded-2xl bg-slate-100 py-12">
        <Animated.View
          style={[
            style,
            {
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#06b6d4",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">✨</Text>
        </Animated.View>
      </View>

      <Pressable onPress={cycle} className="rounded-xl bg-cyan-500 py-3">
        <Text className="text-center font-medium text-white">
          Run state cycle
        </Text>
      </Pressable>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          Store state in a shared value and drive style from it so transitions
          are smooth and interruptible.
        </Text>
      </View>
    </View>
  );
}
