import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function Opacity() {
  const progress = useSharedValue(0);
  const derivedOpacity = useDerivedValue(() => progress.value);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: derivedOpacity.value,
  }));

  const fadeIn = () => {
    progress.value = withTiming(1, { duration: 500 });
  };

  const fadeOut = () => {
    progress.value = withTiming(0, { duration: 500 });
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Opacity derived from progress—smooth! 👻
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            animatedStyle,
            {
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#0ea5e9",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-3xl">👻</Text>
        </Animated.View>
      </View>

      <View className="flex-row gap-3">
        <Pressable
          onPress={fadeIn}
          className="rounded-2xl bg-sky-500 px-6 py-3"
        >
          <Text className="font-medium text-white">Fade In</Text>
        </Pressable>
        <Pressable
          onPress={fadeOut}
          className="rounded-2xl bg-sky-500 px-6 py-3"
        >
          <Text className="font-medium text-white">Fade Out</Text>
        </Pressable>
      </View>
    </View>
  );
}
