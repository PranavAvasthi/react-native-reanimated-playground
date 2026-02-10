import React from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const HEADER_MAX = 120;
const HEADER_MIN = 56;
const CONTAINER_HEIGHT = 420;

export function CollapsingHeader() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, HEADER_MAX - HEADER_MIN],
      [HEADER_MAX, HEADER_MIN],
      "clamp",
    ),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 40], [1, 0], "clamp"),
  }));

  return (
    <View style={{ height: CONTAINER_HEIGHT }}>
      <Animated.View
        style={[
          headerStyle,
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#f97316",
            paddingHorizontal: 24,
            justifyContent: "flex-end",
            paddingBottom: 12,
            zIndex: 10,
          },
        ]}
      >
        <Animated.Text
          style={[
            titleStyle,
            { fontSize: 20, fontWeight: "bold", color: "white" },
          ]}
        >
          Collapsing Header
        </Animated.Text>
        <Text
          style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}
        >
          Scroll to collapse
        </Text>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: HEADER_MAX, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} className="rounded-xl bg-slate-100 p-4">
              <Text className="font-semibold text-slate-900">Section {i}</Text>
              <Text className="mt-1 text-sm text-slate-600">
                Header shrinks from 120px to 56px as you scroll
              </Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
