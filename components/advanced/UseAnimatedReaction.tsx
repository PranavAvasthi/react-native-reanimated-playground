import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export function UseAnimatedReaction() {
  const progress = useSharedValue(0);
  const [crossed, setCrossed] = useState(false);

  useAnimatedReaction(
    () => progress.value,
    (value, prev) => {
      if (prev != null && prev < 0.5 && value >= 0.5) {
        scheduleOnRN(setCrossed, true);
      }
      if (prev != null && prev >= 0.5 && value < 0.5) {
        scheduleOnRN(setCrossed, false);
      }
    },
  );

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 0.8 + progress.value * 0.4 }],
    opacity: 0.6 + progress.value * 0.4,
  }));

  const run = () => {
    progress.value = withTiming(progress.value === 1 ? 0 : 1, {
      duration: 800,
    });
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-600">
        When progress crosses 0.5 we flip a JS state (for demo). Reaction runs
        on UI thread; use runOnJS to update React state.
      </Text>

      <View className="mb-4 items-center">
        <Animated.View
          style={[
            style,
            {
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: "#06b6d4",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">⚡</Text>
        </Animated.View>
      </View>

      <View className="mb-4 rounded-lg bg-cyan-100 p-3">
        <Text className="text-center font-medium text-cyan-800">
          Crossed 0.5: {crossed ? "Yes" : "No"}
        </Text>
      </View>

      <Pressable onPress={run} className="rounded-xl bg-cyan-500 py-3">
        <Text className="text-center font-medium text-white">Toggle 0 → 1</Text>
      </Pressable>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          useAnimatedReaction(prepare, react). prepare returns the value to
          watch; react runs when it changes. Use runOnJS inside react to call
          setState if needed.
        </Text>
      </View>
    </View>
  );
}
