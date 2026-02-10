import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CONTAINER_HEIGHT = 400;
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const BAR_WIDTH = SCREEN_WIDTH - 48; // px-6 = 24*2

export function ScrollProgress() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const progressStyle = useAnimatedStyle(() => ({
    width: interpolate(scrollY.value, [0, 350], [0, BAR_WIDTH], "clamp"),
  }));

  return (
    <View style={{ height: CONTAINER_HEIGHT }}>
      <View className="flex-row items-center justify-between px-6 py-4">
        <Text className="text-sm font-medium text-slate-600">Progress</Text>
        <Text className="text-xs text-slate-500">Scroll to fill</Text>
      </View>
      <View className="mx-6 h-2 overflow-hidden rounded-full bg-slate-200">
        <Animated.View
          style={[
            progressStyle,
            {
              height: 8,
              backgroundColor: "#f97316",
              marginTop: -4,
            },
          ]}
        />
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24, paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 gap-3 pb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <View key={i} className="rounded-xl bg-slate-100 p-4">
              <Text className="font-semibold text-slate-900">Block {i}</Text>
              <Text className="mt-1 text-sm text-slate-600">
                Progress bar fills as you scroll
              </Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
