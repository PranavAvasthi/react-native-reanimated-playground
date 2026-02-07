import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function Comparison() {
  const timingX = useSharedValue(0);
  const springX = useSharedValue(0);

  const timingStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: timingX.value }],
  }));
  const springStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: springX.value }],
  }));

  const runBoth = () => {
    timingX.value = 0;
    springX.value = 0;
    timingX.value = withTiming(100, { duration: 600 });
    springX.value = withSpring(100);
  };

  const reset = () => {
    timingX.value = withTiming(0, { duration: 200 });
    springX.value = withSpring(0);
  };

  const blockStyle = {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Tap to run both—feel the difference! 🆚
      </Text>
      <View className="gap-8">
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-slate-500">
            withTiming
          </Text>
          <View className="h-20 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <View className="absolute left-2 h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
              <Text className="text-lg">🏁</Text>
            </View>
            <Animated.View
              style={[
                timingStyle,
                blockStyle,
                { backgroundColor: "#64748b" },
              ]}
            >
              <Text className="text-lg text-white">⏱</Text>
            </Animated.View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-slate-500">
            withSpring
          </Text>
          <View className="h-20 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <View className="absolute left-2 h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
              <Text className="text-lg">🏁</Text>
            </View>
            <Animated.View
              style={[
                springStyle,
                blockStyle,
                { backgroundColor: "#f59e0b" },
              ]}
            >
              <Text className="text-lg text-white">🏀</Text>
            </Animated.View>
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runBoth}
          className="rounded-2xl bg-amber-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            Run both
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
