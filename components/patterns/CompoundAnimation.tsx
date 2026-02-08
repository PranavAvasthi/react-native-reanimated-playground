import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function CompoundAnimation() {
  const progress = useSharedValue(0);

  const boxStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: 0.9 + progress.value * 0.2 },
      { translateY: progress.value * -20 },
    ],
    opacity: 0.7 + progress.value * 0.3,
  }));

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 10 }],
    opacity: 0.5 + progress.value * 0.5,
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * -10 }],
    opacity: 0.5 + progress.value * 0.5,
  }));

  const run = () => {
    progress.value = 0;
    progress.value = withSequence(
      withTiming(1, { duration: 300 }),
      withSpring(0, { damping: 15 }),
    );
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        One tap—box scales, dots spread, all fade in 📦
      </Text>
      <Pressable onPress={run} className="items-center gap-4">
        <Animated.View
          style={[
            boxStyle,
            {
              width: 120,
              height: 80,
              borderRadius: 16,
              backgroundColor: "#6366f1",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl font-bold text-white">Tap</Text>
          <View className="mt-2 flex-row gap-4">
            <Animated.View
              style={[
                dot1Style,
                {
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "white",
                },
              ]}
            />
            <Animated.View
              style={[
                dot2Style,
                {
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: "white",
                },
              ]}
            />
          </View>
        </Animated.View>
        <Text className="text-sm text-slate-500">Tap to animate all</Text>
      </Pressable>
    </View>
  );
}
