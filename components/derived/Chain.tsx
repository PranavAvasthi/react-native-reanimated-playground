import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export function Chain() {
  const input = useSharedValue(0);
  const a = useDerivedValue(() => input.value * 100);
  const b = useDerivedValue(() => a.value * 0.5);

  const inputStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: input.value * 80 }],
  }));
  const aStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: a.value }],
    opacity: 0.5 + input.value * 0.5,
  }));
  const bStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: b.value }],
    opacity: 0.5 + a.value / 100,
  }));

  const run = () => {
    input.value = withSpring(input.value === 1 ? 0 : 1);
  };

  const blockStyle = {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  };

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        input → A (×100) → B (×0.5) 🔗
      </Text>
      <View className="h-40 w-64 items-start justify-center gap-3 rounded-2xl bg-slate-100 p-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-slate-500">in:</Text>
          <Animated.View
            style={[inputStyle, blockStyle, { backgroundColor: "#0ea5e9" }]}
          >
            <Text className="text-sm text-white">1</Text>
          </Animated.View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-slate-500">A:</Text>
          <Animated.View
            style={[aStyle, blockStyle, { backgroundColor: "#0ea5e9" }]}
          >
            <Text className="text-sm text-white">A</Text>
          </Animated.View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-xs text-slate-500">B:</Text>
          <Animated.View
            style={[bStyle, blockStyle, { backgroundColor: "#0284c7" }]}
          >
            <Text className="text-sm text-white">B</Text>
          </Animated.View>
        </View>
      </View>

      <Pressable onPress={run} className="rounded-2xl bg-sky-500 px-8 py-3">
        <Text className="font-medium text-white">Toggle</Text>
      </Pressable>
    </View>
  );
}
