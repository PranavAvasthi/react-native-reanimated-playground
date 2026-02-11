import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export function AnimationOrchestration() {
  const a = useSharedValue(0);
  const b = useSharedValue(0);
  const c = useSharedValue(0);

  const styleA = useAnimatedStyle(() => ({
    transform: [{ translateX: a.value * 80 }],
  }));
  const styleB = useAnimatedStyle(() => ({
    transform: [{ translateX: b.value * 80 }],
  }));
  const styleC = useAnimatedStyle(() => ({
    transform: [{ translateX: c.value * 80 }],
  }));

  const runSequence = () => {
    a.value = 0;
    b.value = 0;
    c.value = 0;
    a.value = withSequence(
      withTiming(1, { duration: 300 }),
      withTiming(0, { duration: 200 }),
    );
    b.value = withDelay(
      400,
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 200 }),
      ),
    );
    c.value = withDelay(
      800,
      withSequence(
        withTiming(1, { duration: 300 }),
        withTiming(0, { duration: 200 }),
      ),
    );
  };

  const runParallel = () => {
    a.value = 0;
    b.value = 0;
    c.value = 0;
    a.value = withSpring(1);
    b.value = withSpring(1);
    c.value = withSpring(1);
    setTimeout(() => {
      a.value = withSpring(0);
      b.value = withSpring(0);
      c.value = withSpring(0);
    }, 600);
  };

  const box = (style: object, label: string, color: string) => (
    <Animated.View
      style={[
        style,
        {
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Text className="font-bold text-white">{label}</Text>
    </Animated.View>
  );

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Sequence: A → B → C. Parallel: all at once.
      </Text>

      <View className="mb-8 items-center gap-4">
        <View className="flex-row gap-6">
          {box(styleA, "A", "#06b6d4")}
          {box(styleB, "B", "#06b6d4")}
          {box(styleC, "C", "#06b6d4")}
        </View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={runSequence}
          className="rounded-xl bg-cyan-500 py-3"
        >
          <Text className="text-center font-medium text-white">
            Run sequence
          </Text>
        </Pressable>
        <Pressable
          onPress={runParallel}
          className="rounded-xl bg-cyan-600 py-3"
        >
          <Text className="text-center font-medium text-white">
            Run parallel
          </Text>
        </Pressable>
      </View>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          withSequence and withDelay for order; start multiple
          withSpring/withTiming together for parallel.
        </Text>
      </View>
    </View>
  );
}
