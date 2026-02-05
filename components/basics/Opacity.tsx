import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export function Opacity() {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: 400 });
  };

  const fadeOut = () => {
    opacity.value = withTiming(0, { duration: 400 });
  };

  const fadeHalf = () => {
    opacity.value = withTiming(0.5, { duration: 400 });
  };

  const peekaboo = () => {
    opacity.value = withSequence(
      withTiming(0, { duration: 200 }),
      withTiming(1, { duration: 400 }),
    );
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        I'm a ghost! 👻 Make me appear & disappear
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#059669",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-4xl">👻</Text>
          <Text className="mt-1 text-xs font-medium text-white">Boo!</Text>
        </Animated.View>
      </View>

      <View className="flex-row flex-wrap justify-center gap-3">
        <Pressable
          onPress={fadeIn}
          className="rounded-2xl bg-emerald-500 px-5 py-3"
        >
          <Text className="font-medium text-white">✨ Fade In</Text>
        </Pressable>
        <Pressable
          onPress={fadeOut}
          className="rounded-2xl bg-emerald-500 px-5 py-3"
        >
          <Text className="font-medium text-white">👻 Fade Out</Text>
        </Pressable>
        <Pressable
          onPress={fadeHalf}
          className="rounded-2xl bg-emerald-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🌫️ 50%</Text>
        </Pressable>
        <Pressable
          onPress={peekaboo}
          className="rounded-2xl bg-amber-500 px-5 py-3"
        >
          <Text className="font-medium text-white">🙈 Peek-a-boo!</Text>
        </Pressable>
      </View>
    </View>
  );
}
