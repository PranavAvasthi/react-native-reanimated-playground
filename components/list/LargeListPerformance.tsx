import React, { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<number>);

const INITIAL = Array.from({ length: 50 }, (_, i) => i + 1);

export function LargeListPerformance() {
  const [items, setItems] = useState(INITIAL);

  const addFive = () =>
    setItems((prev) => {
      const max = Math.max(...prev, 0);
      return [...prev, max + 1, max + 2, max + 3, max + 4, max + 5];
    });

  const removeFirst = () =>
    setItems((prev) => (prev.length > 1 ? prev.slice(1) : prev));

  const renderItem = useCallback(
    ({ item }: { item: number }) => (
      <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
        layout={LinearTransition.springify()}
        style={{
          padding: 12,
          marginHorizontal: 24,
          marginVertical: 2,
          borderRadius: 8,
          backgroundColor: "#fae8ff",
        }}
      >
        <Text className="text-sm font-medium text-slate-800">{item}</Text>
      </Animated.View>
    ),
    [],
  );

  return (
    <View className="flex-1 pt-6">
      <Text className="mb-4 px-6 text-center text-sm text-slate-500">
        50+ items—layout animations on insert/remove
      </Text>
      <View className="mb-4 flex-row justify-center gap-3 px-6">
        <Pressable
          onPress={addFive}
          className="rounded-xl bg-fuchsia-500 px-4 py-2"
        >
          <Text className="text-sm font-medium text-white">+5</Text>
        </Pressable>
        <Pressable
          onPress={removeFirst}
          className="rounded-xl bg-slate-300 px-4 py-2"
        >
          <Text className="text-sm font-medium text-slate-700">−1</Text>
        </Pressable>
      </View>
      <AnimatedFlatList
        data={items}
        keyExtractor={(n) => String(n)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  );
}
