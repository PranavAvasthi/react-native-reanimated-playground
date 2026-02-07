import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";

export function Chain() {
  const block1 = useSharedValue(0);
  const block2 = useSharedValue(0);
  const block3 = useSharedValue(0);

  const style1 = useAnimatedStyle(() => ({
    transform: [{ translateX: block1.value }],
  }));
  const style2 = useAnimatedStyle(() => ({
    transform: [{ translateX: block2.value }],
  }));
  const style3 = useAnimatedStyle(() => ({
    transform: [{ translateX: block3.value }],
  }));

  const runChain = () => {
    block1.value = 0;
    block2.value = 0;
    block3.value = 0;
    block1.value = withSpring(80);
    block2.value = withDelay(200, withSpring(80));
    block3.value = withDelay(400, withSpring(80));
  };

  const reset = () => {
    block1.value = withSpring(0);
    block2.value = withSpring(0);
    block3.value = withSpring(0);
  };

  const blockStyle = {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Domino chain! Each springs in sequence 🎴
      </Text>
      <View className="h-32 w-64 flex-row items-center justify-center gap-2 rounded-2xl bg-slate-100">
        <Animated.View
          style={[style1, blockStyle, { backgroundColor: "#f59e0b" }]}
        >
          <Text className="text-xl">1</Text>
        </Animated.View>
        <Animated.View
          style={[style2, blockStyle, { backgroundColor: "#f59e0b" }]}
        >
          <Text className="text-xl">2</Text>
        </Animated.View>
        <Animated.View
          style={[style3, blockStyle, { backgroundColor: "#f59e0b" }]}
        >
          <Text className="text-xl">3</Text>
        </Animated.View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runChain}
          className="rounded-2xl bg-amber-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            ▶️ Run chain
          </Text>
        </Pressable>
        <Pressable onPress={reset} className="rounded-2xl bg-slate-700 py-3">
          <Text className="text-center font-medium text-white">Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}
