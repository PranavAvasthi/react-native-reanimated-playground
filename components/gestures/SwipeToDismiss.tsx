import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const DISMISS_THRESHOLD = 120;
const VELOCITY_THRESHOLD = 500;

export function SwipeToDismiss() {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd((e) => {
      const shouldDismiss =
        e.translationX < -DISMISS_THRESHOLD ||
        e.velocityX < -VELOCITY_THRESHOLD;
      if (shouldDismiss) {
        translateX.value = withTiming(-400, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const reset = () => {
    translateX.value = withSpring(0);
    opacity.value = withTiming(1);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Swipe left to dismiss 👈
      </Text>
      <View className="h-24 w-full max-w-sm overflow-hidden rounded-2xl bg-slate-100">
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              animatedStyle,
              {
                width: "100%",
                height: "100%",
                backgroundColor: "#14b8a6",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
              },
            ]}
          >
            <Text className="text-lg font-medium text-white">
              Swipe me away!
            </Text>
          </Animated.View>
        </GestureDetector>
      </View>
      <Text onPress={reset} className="text-sm font-medium text-teal-600">
        Reset
      </Text>
    </View>
  );
}
