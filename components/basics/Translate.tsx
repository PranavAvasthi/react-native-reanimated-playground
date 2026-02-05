import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Translate() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const moveToCenter = () => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
  };

  const moveUp = () => {
    translateY.value = withSpring(-80);
  };

  const moveDown = () => {
    translateY.value = withSpring(80);
  };

  const moveLeft = () => {
    translateX.value = withSpring(-80);
  };

  const moveRight = () => {
    translateX.value = withSpring(80);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Push me around! 👆
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#059669",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-2xl">🎯</Text>
          <Text className="text-xs font-medium text-white">Slide me!</Text>
        </Animated.View>
      </View>

      <View className="gap-4">
        <View className="flex-row justify-center gap-2">
          <Pressable
            onPress={moveLeft}
            className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 active:scale-95"
          >
            <Text className="text-xl text-white">←</Text>
          </Pressable>
          <Pressable
            onPress={moveUp}
            className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 active:scale-95"
          >
            <Text className="text-xl text-white">↑</Text>
          </Pressable>
          <Pressable
            onPress={moveDown}
            className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 active:scale-95"
          >
            <Text className="text-xl text-white">↓</Text>
          </Pressable>
          <Pressable
            onPress={moveRight}
            className="h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 active:scale-95"
          >
            <Text className="text-xl text-white">→</Text>
          </Pressable>
        </View>
        <Pressable
          onPress={moveToCenter}
          className="rounded-2xl bg-amber-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            🏠 Back to center
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
