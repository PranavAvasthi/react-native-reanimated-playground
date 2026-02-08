import React from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const BOX_SIZE = 200;
const BLOCK_SIZE = 64;
const MIN = -(BOX_SIZE / 2 - BLOCK_SIZE / 2);
const MAX = BOX_SIZE / 2 - BLOCK_SIZE / 2;

export function DragWithBoundaries() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: Math.min(Math.max(translateX.value, MIN), MAX),
      },
      {
        translateY: Math.min(Math.max(translateY.value, MIN), MAX),
      },
    ],
  }));

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = offsetX.value + e.translationX;
      translateY.value = offsetY.value + e.translationY;
    })
    .onEnd(() => {
      offsetX.value = Math.min(Math.max(translateX.value, MIN), MAX);
      offsetY.value = Math.min(Math.max(translateY.value, MIN), MAX);
      translateX.value = offsetX.value;
      translateY.value = offsetY.value;
    });

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        I can't leave the box! 📦
      </Text>
      <View
        className="items-center justify-center rounded-2xl border-2 border-dashed border-teal-300 bg-slate-100"
        style={{ width: BOX_SIZE, height: BOX_SIZE }}
      >
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              animatedStyle,
              {
                width: BLOCK_SIZE,
                height: BLOCK_SIZE,
                borderRadius: 16,
                backgroundColor: "#14b8a6",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-2xl">🎯</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </View>
  );
}
