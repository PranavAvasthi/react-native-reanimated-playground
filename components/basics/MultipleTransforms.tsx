import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function MultipleTransforms() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const celebrate = () => {
    translateX.value = withSpring(30);
    translateY.value = withSpring(-50);
    scale.value = withSpring(1.3);
    rotate.value = withSpring(15);
    opacity.value = withTiming(0.9, { duration: 200 });
  };

  const party = () => {
    translateX.value = withSpring(-20);
    translateY.value = withSpring(40);
    scale.value = withSpring(1.2);
    rotate.value = withSpring(-20);
    opacity.value = withTiming(0.85, { duration: 200 });
  };

  const reset = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
    rotate.value = withSpring(0);
    opacity.value = withTiming(1, { duration: 300 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        All transforms at once! Let's party 🎉
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
          <Text className="text-3xl">🎉</Text>
          <Text className="text-xs font-medium text-white">Woo!</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={celebrate}
          className="rounded-2xl bg-emerald-500 py-4"
        >
          <Text className="text-center font-medium text-white">
            🎊 Celebrate!
          </Text>
        </Pressable>
        <Pressable onPress={party} className="rounded-2xl bg-violet-500 py-4">
          <Text className="text-center font-medium text-white">
            🪩 Party mode!
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
