import React from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

function SyncedBox({
  progress,
  label,
  color,
}: {
  progress: SharedValue<number>;
  label: string;
  color: string;
}) {
  const style = useAnimatedStyle(() => ({
    transform: [
      { translateY: progress.value * 40 },
      { scale: 0.9 + progress.value * 0.2 },
    ],
    opacity: 0.7 + progress.value * 0.3,
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          width: 64,
          height: 64,
          borderRadius: 16,
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
        },
      ]}
    >
      <Text className="font-bold text-white">{label}</Text>
    </Animated.View>
  );
}

export function CrossComponentSync() {
  const progress = useSharedValue(0);

  const toggle = () => {
    progress.value = withSpring(progress.value === 1 ? 0 : 1);
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        One shared value passed to two children. Both stay in sync, no
        re-renders.
      </Text>

      <View className="mb-8 flex-row justify-center gap-8">
        <SyncedBox progress={progress} label="A" color="#06b6d4" />
        <SyncedBox progress={progress} label="B" color="#0891b2" />
      </View>

      <Pressable onPress={toggle} className="rounded-xl bg-cyan-500 py-3">
        <Text className="text-center font-medium text-white">Toggle sync</Text>
      </Pressable>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          Pass SharedValue as prop. Children use useAnimatedStyle(progress);
          parent updates progress and both update on UI thread.
        </Text>
      </View>
    </View>
  );
}
