import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from "react-native-reanimated";

export function EnterExit() {
  const [items, setItems] = useState([1, 2, 3]);

  const add = () => setItems((prev) => [...prev, prev.length + 1]);
  const remove = () =>
    setItems((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Add/remove items—enter and exit animated
      </Text>
      <View className="mb-4 flex-row justify-center gap-3">
        <Pressable onPress={add} className="rounded-xl bg-lime-500 px-5 py-2.5">
          <Text className="font-medium text-white">Add</Text>
        </Pressable>
        <Pressable
          onPress={remove}
          className="rounded-xl bg-slate-300 px-5 py-2.5"
        >
          <Text className="font-medium text-slate-700">Remove</Text>
        </Pressable>
      </View>
      <View className="gap-3">
        {items.map((id) => (
          <Animated.View
            key={id}
            entering={FadeInDown.duration(300)}
            exiting={FadeOutUp.duration(250)}
            layout={LinearTransition.springify()}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: "#dcfce7",
            }}
          >
            <Text className="font-semibold text-slate-800">Item {id}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
