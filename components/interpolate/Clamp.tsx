import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function Clamp() {
  const progress = useSharedValue(0);

  const extendStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [0, 100]),
      },
    ],
  }));

  const clampStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(progress.value, [0, 1], [0, 100], "clamp"),
      },
    ],
  }));

  const run = () => {
    progress.value = 0;
    progress.value = withRepeat(withTiming(1.3, { duration: 1200 }), 2, true);
  };

  const reset = () => {
    progress.value = withTiming(0, { duration: 300 });
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
        Left: EXTEND (overshoots). Right: CLAMP (stays at 100) 📏
      </Text>
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-slate-500">
            Extend (default)
          </Text>
          <View className="h-20 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <View className="absolute left-2 h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
              <Text className="text-lg">🏁</Text>
            </View>
            <Animated.View
              style={[
                extendStyle,
                blockStyle,
                {
                  position: "absolute",
                  left: 0,
                  backgroundColor: "#f43f5e",
                },
              ]}
            >
              <Text className="text-lg text-white">→</Text>
            </Animated.View>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-slate-500">
            Clamp
          </Text>
          <View className="h-20 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <View className="absolute left-2 h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-300">
              <Text className="text-lg">🏁</Text>
            </View>
            <Animated.View
              style={[
                clampStyle,
                blockStyle,
                {
                  position: "absolute",
                  left: 0,
                  backgroundColor: "#e11d48",
                },
              ]}
            >
              <Text className="text-lg text-white">⊔</Text>
            </Animated.View>
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Pressable onPress={run} className="rounded-2xl bg-rose-500 py-3">
          <Text className="text-center font-medium text-white">
            Run (progress 0 → 1.3)
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
