import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function GestureWithSpring() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0, { damping: 15 });
      translateY.value = withSpring(0, { damping: 15 });
    });

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Drag and release—I spring back! 🏀
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              animatedStyle,
              {
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: "#14b8a6",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-3xl">🎾</Text>
            <Text className="text-xs font-medium text-white">Drag me!</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
