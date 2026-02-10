import React from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CONTAINER_HEIGHT = 380;

export function ScrollBasics() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const boxStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 100], [1, 0.4], "clamp"),
    transform: [
      {
        scale: interpolate(scrollY.value, [0, 150], [1, 0.9], "clamp"),
      },
    ],
  }));

  return (
    <View style={{ height: CONTAINER_HEIGHT }}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={[
            boxStyle,
            {
              height: 100,
              marginHorizontal: 24,
              marginBottom: 16,
              borderRadius: 16,
              backgroundColor: "#f97316",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl font-bold text-white">Scroll me!</Text>
          <Text className="mt-1 text-xs text-white/80">
            I fade & scale as you scroll
          </Text>
        </Animated.View>
        <View className="px-6 gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className="rounded-xl bg-slate-100 p-4">
              <Text className="font-semibold text-slate-900">Block {i}</Text>
              <Text className="mt-1 text-sm text-slate-600">
                useAnimatedScrollHandler drives animations on the UI thread
              </Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
