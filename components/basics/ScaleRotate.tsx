import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function ScaleRotate() {
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const scaleUp = () => {
    scale.value = withSpring(1.6);
  };

  const scaleDown = () => {
    scale.value = withSpring(0.6);
  };

  const rotateLeft = () => {
    rotate.value = withSpring(rotate.value - 90);
  };

  const rotateRight = () => {
    rotate.value = withSpring(rotate.value + 90);
  };

  const spin = () => {
    rotate.value = withSpring(rotate.value + 360);
  };

  const reset = () => {
    scale.value = withSpring(1);
    rotate.value = withSpring(0);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Squeeze me! Spin me! I won't get dizzy 🎡
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 80,
              height: 80,
              borderRadius: 20,
              backgroundColor: "#059669",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">🎪</Text>
          <Text className="text-xs font-medium text-white">Whee!</Text>
        </Animated.View>
      </View>

      <View className="gap-4">
        <View className="flex-row justify-center gap-3">
          <Pressable
            onPress={scaleUp}
            className="rounded-2xl bg-emerald-500 px-5 py-3"
          >
            <Text className="font-medium text-white">📈 Bigger</Text>
          </Pressable>
          <Pressable
            onPress={scaleDown}
            className="rounded-2xl bg-emerald-500 px-5 py-3"
          >
            <Text className="font-medium text-white">📉 Smaller</Text>
          </Pressable>
        </View>
        <View className="flex-row justify-center gap-3">
          <Pressable
            onPress={rotateLeft}
            className="rounded-2xl bg-emerald-500 px-5 py-3"
          >
            <Text className="font-medium text-white">↺ Left</Text>
          </Pressable>
          <Pressable
            onPress={spin}
            className="rounded-2xl bg-violet-500 px-5 py-3"
          >
            <Text className="font-medium text-white">🌀 Spin!</Text>
          </Pressable>
          <Pressable
            onPress={rotateRight}
            className="rounded-2xl bg-emerald-500 px-5 py-3"
          >
            <Text className="font-medium text-white">Right ↻</Text>
          </Pressable>
        </View>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
