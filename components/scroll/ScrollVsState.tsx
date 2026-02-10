import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const CONTAINER_HEIGHT = 360;

export function ScrollVsState() {
  const scrollY = useSharedValue(0);
  const [stateScrollY, setStateScrollY] = useState(0);

  const setScrollY = useCallback((y: number) => setStateScrollY(y), []);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
      scheduleOnRN(setScrollY, Math.round(e.contentOffset.y));
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: Math.min(scrollY.value * 0.5, 80) }],
  }));

  return (
    <View style={{ height: CONTAINER_HEIGHT }}>
      <View className="flex-row gap-4 px-6 py-3 bg-slate-100">
        <View className="flex-1 rounded-lg bg-white p-3">
          <Text className="text-xs font-semibold text-orange-600">
            Shared Value
          </Text>
          <Text className="text-lg font-bold text-slate-800">UI thread</Text>
        </View>
        <View className="flex-1 rounded-lg bg-white p-3">
          <Text className="text-xs font-semibold text-slate-500">
            React State
          </Text>
          <Text className="text-lg font-bold text-slate-800">
            {stateScrollY}px
          </Text>
        </View>
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={32}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-16">
          <Animated.View
            style={[
              animatedStyle,
              {
                height: 60,
                borderRadius: 12,
                backgroundColor: "#f97316",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              },
            ]}
          >
            <Text className="font-bold text-white">Driven by shared value</Text>
            <Text className="text-xs text-white/80">Smooth, no jank</Text>
          </Animated.View>
          <Text className="text-sm text-slate-600 mb-4">
            Shared value animates on UI thread. State causes re-renders.
          </Text>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} className="rounded-xl bg-slate-100 p-4 mb-3">
              <Text className="font-semibold text-slate-900">Block {i}</Text>
              <Text className="mt-1 text-sm text-slate-600">
                useAnimatedScrollHandler vs onScroll + setState
              </Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
