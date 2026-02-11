import React, { useCallback } from "react";
import { FlatList, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedFlatListComponent = Animated.createAnimatedComponent(
  FlatList<string>,
);

const DATA = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

export function AnimatedFlatList() {
  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <Animated.View
        entering={FadeInDown.delay(index * 40).duration(300)}
        layout={LinearTransition.springify()}
        style={{
          padding: 16,
          marginHorizontal: 24,
          marginVertical: 4,
          borderRadius: 12,
          backgroundColor: "#fae8ff",
        }}
      >
        <Text className="font-semibold text-slate-800">{item}</Text>
      </Animated.View>
    ),
    [],
  );

  return (
    <View className="flex-1 pt-6">
      <Text className="mb-4 px-6 text-center text-sm text-slate-500">
        Animated.FlatList—items animate in with stagger
      </Text>
      <AnimatedFlatListComponent
        data={DATA}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
