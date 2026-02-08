import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type State = "idle" | "animating" | "complete";

export function StateMachine() {
  const progress = useSharedValue(0);
  const [state, setState] = useState<State>("idle");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.8 + progress.value * 0.4 }],
    opacity: 0.5 + progress.value * 0.5,
  }));

  const run = () => {
    setState("animating");
    progress.value = 0;
    progress.value = withSequence(
      withTiming(1, { duration: 800 }),
      withTiming(0, { duration: 400 }),
    );
    setTimeout(() => setState("complete"), 1200);
    setTimeout(() => setState("idle"), 2000);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        State: idle → animating → complete
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
          <Text className="text-3xl">🔄</Text>
        </Animated.View>
      </View>

      <View className="items-center gap-2">
        <View
          className={`rounded-lg px-4 py-2 ${
            state === "idle"
              ? "bg-slate-200"
              : state === "animating"
                ? "bg-indigo-200"
                : "bg-emerald-200"
          }`}
        >
          <Text
            className={`font-semibold ${
              state === "idle"
                ? "text-slate-700"
                : state === "animating"
                  ? "text-indigo-700"
                  : "text-emerald-700"
            }`}
          >
            {state.toUpperCase()}
          </Text>
        </View>
        <Pressable
          onPress={run}
          className="rounded-2xl bg-indigo-500 px-8 py-3"
        >
          <Text className="font-medium text-white">Run</Text>
        </Pressable>
      </View>
    </View>
  );
}
