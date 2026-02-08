import React from "react";
import { Text, View } from "react-native";
import {
  GestureDetector,
  Gesture as RNGesture,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Gesture() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const derivedRotation = useDerivedValue(() =>
    interpolate(translateX.value, [-100, 100], [-30, 30]),
  );
  const derivedScale = useDerivedValue(() =>
    interpolate(translateY.value, [-80, 80], [0.8, 1.2]),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${derivedRotation.value}deg` },
      { scale: derivedScale.value },
    ],
  }));

  const pan = RNGesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Rotation from X, scale from Y—drag me! 👆
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
                backgroundColor: "#0ea5e9",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-3xl">🎯</Text>
            <Text className="text-xs font-medium text-white">Drag!</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
