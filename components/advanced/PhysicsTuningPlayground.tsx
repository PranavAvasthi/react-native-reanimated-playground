import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PRESETS = [
  { label: "Bouncy", damping: 8, stiffness: 100, mass: 1 },
  { label: "Snappy", damping: 15, stiffness: 150, mass: 1 },
  { label: "Heavy", damping: 20, stiffness: 80, mass: 2 },
  { label: "Wobbly", damping: 6, stiffness: 80, mass: 1 },
];

export function PhysicsTuningPlayground() {
  const x = useSharedValue(0);
  const [preset, setPreset] = useState<string | null>(null);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],
  }));

  const run = (config: {
    damping: number;
    stiffness: number;
    mass?: number;
  }) => {
    x.value = 0;
    x.value = withSpring(140, config);
    setTimeout(() => {
      x.value = withSpring(0, config);
    }, 800);
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Tap a preset to feel the difference. Same distance, different physics.
      </Text>

      <View className="mb-6 h-28 items-center justify-center rounded-2xl bg-slate-100">
        <Animated.View
          style={[
            style,
            {
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: "#06b6d4",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl">🎾</Text>
        </Animated.View>
      </View>

      <View className="mb-2 flex-row flex-wrap justify-center gap-2">
        {PRESETS.map((p) => (
          <Pressable
            key={p.label}
            onPress={() => {
              setPreset(p.label);
              run(p);
            }}
            className="rounded-xl bg-cyan-500 px-4 py-2"
          >
            <Text className="font-medium text-white">{p.label}</Text>
          </Pressable>
        ))}
      </View>
      {preset && (
        <Text className="mb-4 text-center text-xs text-slate-500">
          Last: {preset}
        </Text>
      )}

      <Pressable
        onPress={() => {
          setPreset(null);
          x.value = withSpring(0, { damping: 15 });
        }}
        className="rounded-xl bg-slate-600 py-2"
      >
        <Text className="text-center font-medium text-white">Reset</Text>
      </Pressable>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          damping: lower = more bounce. stiffness: higher = snappier. mass:
          higher = heavier feel.
        </Text>
      </View>
    </View>
  );
}
