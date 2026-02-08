import React from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CONTAINER_HEIGHT = 360;

export function Scroll() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(scrollY.value, [0, 120], [1, 0.85], "clamp"),
      },
    ],
    opacity: interpolate(scrollY.value, [0, 80], [1, 0.5], "clamp"),
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 60], [0.6, 1], "clamp"),
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
            headerStyle,
            {
              height: 100,
              marginHorizontal: 24,
              marginBottom: 12,
              borderRadius: 16,
              backgroundColor: "#f43f5e",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text className="text-xl font-bold text-white">Header</Text>
          <Text className="mt-1 text-xs text-white/80">
            Scroll down—I scale & fade
          </Text>
        </Animated.View>
        <Animated.View style={[contentStyle, { paddingHorizontal: 24 }]}>
          <View className="gap-3">
            {[1, 2, 3, 4].map((i) => (
              <View key={i} className="rounded-xl bg-slate-100 p-4">
                <Text className="font-semibold text-slate-900">Block {i}</Text>
                <Text className="mt-1 text-sm text-slate-600">
                  Scroll to see header animate
                </Text>
              </View>
            ))}
          </View>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}
