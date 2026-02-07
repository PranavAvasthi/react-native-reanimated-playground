import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Configs() {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const run = (config: {
    damping: number;
    stiffness: number;
    mass?: number;
  }) => {
    translateX.value = 0;
    translateX.value = withSpring(120, config);
  };

  const reset = () => {
    translateX.value = withSpring(0, { damping: 15 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Same distance, different spring configs 🎛️
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
              backgroundColor: "#f59e0b",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🎾</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={() => run({ damping: 8, stiffness: 100 })}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🎈 Bouncy</Text>
        </Pressable>
        <Pressable
          onPress={() => run({ damping: 15, stiffness: 150 })}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">⚡ Snappy</Text>
        </Pressable>
        <Pressable
          onPress={() => run({ damping: 20, stiffness: 80, mass: 2 })}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🐘 Heavy</Text>
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
