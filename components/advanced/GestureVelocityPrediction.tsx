import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function GestureVelocityPrediction() {
  const x = useSharedValue(0);
  const target = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      x.value = e.translationX + target.value;
    })
    .onEnd((e) => {
      const V = e.velocityX;
      const current = x.value;
      const projected = current + V * 0.15;
      const clamped = Math.max(-120, Math.min(120, projected));
      target.value = clamped;
      x.value = withSpring(clamped, {
        damping: 15,
        stiffness: 150,
        velocity: V,
      });
    });

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Drag and release. Velocity is passed into withSpring so the motion
        continues naturally.
      </Text>

      <View className="mb-8 h-24 items-center justify-center rounded-2xl bg-slate-100">
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              style,
              {
                width: 64,
                height: 64,
                borderRadius: 16,
                backgroundColor: "#06b6d4",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-2xl">👆</Text>
          </Animated.View>
        </GestureDetector>
      </View>

      <View className="rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          In onEnd use event.velocityX/velocityY and pass to withSpring as
          velocity. Reanimated continues from current position with that
          velocity.
        </Text>
      </View>
    </View>
  );
}
