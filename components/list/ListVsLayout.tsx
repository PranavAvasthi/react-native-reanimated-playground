import React, { useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<number>);

export function ListVsLayout() {
  const [count, setCount] = useState(5);
  const items = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        ScrollView .map vs FlatList—both with layout
      </Text>
      <View className="mb-4 flex-row justify-center gap-2">
        <Pressable
          onPress={() => setCount((c) => Math.max(1, c - 1))}
          className="rounded-lg bg-slate-200 px-4 py-2"
        >
          <Text className="font-medium text-slate-700">−</Text>
        </Pressable>
        <Text className="self-center font-medium text-slate-700">
          Items: {count}
        </Text>
        <Pressable
          onPress={() => setCount((c) => c + 1)}
          className="rounded-lg bg-fuchsia-500 px-4 py-2"
        >
          <Text className="font-medium text-white">+</Text>
        </Pressable>
      </View>

      <View className="mb-6">
        <Text className="mb-2 font-semibold text-slate-700">
          ScrollView + map
        </Text>
        <ScrollView
          style={{ maxHeight: 160 }}
          showsVerticalScrollIndicator={false}
        >
          {items.map((n) => (
            <Animated.View
              key={n}
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(150)}
              layout={LinearTransition.springify()}
              style={{
                padding: 10,
                marginVertical: 2,
                borderRadius: 8,
                backgroundColor: "#fae8ff",
              }}
            >
              <Text className="text-sm font-medium text-slate-800">{n}</Text>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      <View>
        <Text className="mb-2 font-semibold text-slate-700">FlatList</Text>
        <View style={{ height: 160 }}>
          <AnimatedFlatList
            data={items}
            keyExtractor={(n) => String(n)}
            renderItem={({ item }) => (
              <Animated.View
                entering={FadeIn.duration(200)}
                exiting={FadeOut.duration(150)}
                layout={LinearTransition.springify()}
                style={{
                  padding: 10,
                  marginVertical: 2,
                  borderRadius: 8,
                  backgroundColor: "#fae8ff",
                }}
              >
                <Text className="text-sm font-medium text-slate-800">
                  {item}
                </Text>
              </Animated.View>
            )}
          />
        </View>
      </View>

      <View className="mt-4 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          FlatList virtualizes; ScrollView renders all. Both support
          entering/exiting/layout.
        </Text>
      </View>
    </View>
  );
}
