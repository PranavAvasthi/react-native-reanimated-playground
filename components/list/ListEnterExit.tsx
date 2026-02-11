import React, { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutLeft,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<number>);

export function ListEnterExit() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  const add = () =>
    setItems((prev) => [...prev, (prev[prev.length - 1] ?? 0) + 1]);
  const remove = () =>
    setItems((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const renderItem = ({ item }: { item: number }) => (
    <Animated.View
      entering={FadeInRight.duration(280)}
      exiting={FadeOutLeft.duration(220)}
      layout={LinearTransition.springify()}
      style={{
        padding: 16,
        marginHorizontal: 24,
        marginVertical: 4,
        borderRadius: 12,
        backgroundColor: "#fae8ff",
      }}
    >
      <Text className="font-semibold text-slate-800">Item {item}</Text>
    </Animated.View>
  );

  return (
    <View className="flex-1 pt-4">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Add/remove from list—enter/exit animated
      </Text>
      <View className="mb-4 flex-row justify-center gap-3">
        <Pressable
          onPress={add}
          className="rounded-xl bg-fuchsia-500 px-5 py-2.5"
        >
          <Text className="font-medium text-white">Add</Text>
        </Pressable>
        <Pressable
          onPress={remove}
          className="rounded-xl bg-slate-300 px-5 py-2.5"
        >
          <Text className="font-medium text-slate-700">Remove</Text>
        </Pressable>
      </View>
      <AnimatedFlatList
        data={items}
        keyExtractor={(n) => String(n)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        scrollEnabled
      />
    </View>
  );
}
