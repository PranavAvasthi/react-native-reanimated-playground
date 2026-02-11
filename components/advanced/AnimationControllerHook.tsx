import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

function useAnimationController(duration: number = 1500) {
  const progress = useSharedValue(0);
  const isPlaying = useSharedValue(false);

  const play = () => {
    isPlaying.value = true;
    progress.value = withTiming(1, {
      duration: duration * (1 - progress.value),
    });
  };

  const pause = () => {
    progress.value = progress.value;
    isPlaying.value = false;
    progress.value = withTiming(progress.value, { duration: 0 });
  };

  const reset = () => {
    progress.value = withTiming(0, { duration: 300 });
    isPlaying.value = false;
  };

  return { progress, play, pause, reset };
}

export function AnimationControllerHook() {
  const { progress, play, pause, reset } = useAnimationController(2000);

  const style = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Reusable controller: play, pause, reset. Progress drives the bar.
      </Text>

      <View className="mb-6 h-3 overflow-hidden rounded-full bg-slate-200">
        <Animated.View
          style={[
            style,
            {
              height: "100%",
              backgroundColor: "#06b6d4",
              borderRadius: 6,
            },
          ]}
        />
      </View>

      <View className="flex-row justify-center gap-3">
        <Pressable onPress={play} className="rounded-xl bg-green-500 px-5 py-3">
          <Text className="font-medium text-white">Play</Text>
        </Pressable>
        <Pressable onPress={pause} className="rounded-xl bg-amber-500 px-5 py-3">
          <Text className="font-medium text-white">Pause</Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-xl bg-slate-600 px-5 py-3">
          <Text className="font-medium text-white">Reset</Text>
        </Pressable>
      </View>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          Hook returns progress (SharedValue), play(), pause(), reset(). Use
          the same hook in multiple screens for consistent control.
        </Text>
      </View>
    </View>
  );
}
