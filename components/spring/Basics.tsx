import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Basics() {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  const bounce = () => {
    scale.value = 1;
    translateY.value = 0;
    scale.value = withSpring(1.4);
    translateY.value = withSpring(-40);
  };

  const squish = () => {
    scale.value = withSpring(1.2, { damping: 8 });
    translateY.value = withSpring(20);
  };

  const reset = () => {
    scale.value = withSpring(1);
    translateY.value = withSpring(0);
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Bounce me! Feel the spring physics 🏀
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 72,
              height: 72,
              borderRadius: 20,
              backgroundColor: "#f59e0b",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">🏀</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={bounce}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">⬆️ Bounce up</Text>
        </Pressable>
        <Pressable
          onPress={squish}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">⬇️ Squish down</Text>
        </Pressable>
        <Pressable
          onPress={reset}
          className="rounded-2xl bg-slate-700 px-5 py-3"
        >
          <Text className="font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
