import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const INITIAL = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

export function Reorder() {
  const [items, setItems] = useState(INITIAL);

  const moveUp = (index: number) => {
    if (index === 0) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    setItems((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  };

  const reset = () => setItems(INITIAL);

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Move items—layout animates reorder
      </Text>
      <Pressable
        onPress={reset}
        className="mb-4 self-center rounded-xl bg-slate-200 px-4 py-2"
      >
        <Text className="text-sm font-medium text-slate-700">Reset</Text>
      </Pressable>
      <View className="gap-2">
        {items.map((label, index) => (
          <Animated.View
            key={label}
            layout={LinearTransition.springify().stiffness(120)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 14,
              borderRadius: 12,
              backgroundColor: "#dcfce7",
            }}
          >
            <Text className="font-semibold text-slate-800">{label}</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => moveUp(index)}
                disabled={index === 0}
                className="rounded-lg bg-lime-500 px-3 py-1.5 opacity-100 disabled:opacity-40"
              >
                <Text className="text-xs font-medium text-white">↑</Text>
              </Pressable>
              <Pressable
                onPress={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="rounded-lg bg-lime-500 px-3 py-1.5 opacity-100 disabled:opacity-40"
              >
                <Text className="text-xs font-medium text-white">↓</Text>
              </Pressable>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
