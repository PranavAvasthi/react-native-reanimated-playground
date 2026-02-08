import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Toggle() {
  const progress = useSharedValue(0);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ["#cbd5e1", "#6366f1"],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * 24 }],
  }));

  const toggle = () => {
    progress.value = withTiming(progress.value === 1 ? 0 : 1, {
      duration: 200,
    });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Toggle on/off—smooth transition 🔘
      </Text>
      <Pressable onPress={toggle} className="items-center gap-4">
        <View className="flex-row items-center gap-3">
          <Animated.View
            style={[
              trackStyle,
              {
                width: 56,
                height: 32,
                borderRadius: 16,
                justifyContent: "center",
                padding: 2,
              },
            ]}
          >
            <Animated.View
              style={[
                thumbStyle,
                {
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "white",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                },
              ]}
            />
          </Animated.View>
          <Text className="text-lg font-medium text-slate-700">Switch</Text>
        </View>
        <Text className="text-sm text-slate-500">Tap to toggle</Text>
      </Pressable>
    </View>
  );
}
