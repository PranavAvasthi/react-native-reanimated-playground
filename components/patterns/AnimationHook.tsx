import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from "react-native-reanimated";

function useBounceAnimation() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const bounce = () => {
    scale.value = withSequence(
      withSpring(1.3, { damping: 8 }),
      withSpring(1),
    );
  };

  return { animatedStyle, bounce };
}

export function AnimationHook() {
  const { animatedStyle, bounce } = useBounceAnimation();

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        useBounceAnimation() → style + trigger
      </Text>
      <View className="h-52 w-52 items-center justify-center rounded-2xl bg-slate-100">
        <Pressable onPress={bounce}>
          <Animated.View
            style={[
              animatedStyle,
              {
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: "#6366f1",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="text-3xl">🎾</Text>
            <Text className="text-xs font-medium text-white">Bounce!</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}
