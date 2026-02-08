import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SNAP_POINTS = [-80, 0, 80];

export function GestureSnapPoints() {
  const translateX = useSharedValue(0);
  const offsetX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = offsetX.value + e.translationX;
    })
    .onEnd(() => {
      const x = translateX.value;
      const target = x < -40 ? -80 : x < 40 ? 0 : 80;
      translateX.value = withSpring(target, { damping: 20 });
      offsetX.value = target;
    });

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Swipe and release—I snap to nearest position ↔
      </Text>
      <View className="h-40 w-64 items-center justify-center rounded-2xl bg-slate-100">
        <View className="absolute left-4 h-12 w-12 items-center justify-center rounded-lg border border-slate-300">
          <Text className="text-lg">L</Text>
        </View>
        <View className="absolute h-12 w-12 items-center justify-center rounded-lg border border-slate-300">
          <Text className="text-lg">C</Text>
        </View>
        <View className="absolute right-4 h-12 w-12 items-center justify-center rounded-lg border border-slate-300">
          <Text className="text-lg">R</Text>
        </View>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              animatedStyle,
              {
                width: 56,
                height: 56,
                borderRadius: 16,
                backgroundColor: "#14b8a6",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-xl text-white">🎯</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
