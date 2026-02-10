import React from "react";
import { Dimensions, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const CONTAINER_HEIGHT = 420;
const { width: SCREEN_WIDTH } = Dimensions.get("screen");
const TAB_ROW_PADDING = 32;
const TAB_WIDTH = (SCREEN_WIDTH - TAB_ROW_PADDING) / 3;

export function DrivenTabs() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const tab1Style = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 80], [1, 0.4], "clamp"),
  }));

  const tab2Style = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [80, 180, 220, 300],
      [0.4, 1, 1, 0.4],
      "clamp",
    ),
  }));

  const tab3Style = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [180, 250], [0.4, 1], "clamp"),
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollY.value,
          [0, 90, 180],
          [0, TAB_WIDTH, TAB_WIDTH * 2],
          "clamp",
        ),
      },
    ],
  }));

  return (
    <View style={{ height: CONTAINER_HEIGHT }}>
      <View
        className="flex-row border-b border-slate-200 px-4"
        style={{ position: "relative" }}
      >
        <View style={{ flex: 1, paddingVertical: 12, alignItems: "center" }}>
          <Animated.Text
            style={[tab1Style, { fontWeight: "600", color: "#0f172a" }]}
          >
            One
          </Animated.Text>
        </View>
        <View style={{ flex: 1, paddingVertical: 12, alignItems: "center" }}>
          <Animated.Text
            style={[tab2Style, { fontWeight: "600", color: "#475569" }]}
          >
            Two
          </Animated.Text>
        </View>
        <View style={{ flex: 1, paddingVertical: 12, alignItems: "center" }}>
          <Animated.Text
            style={[tab3Style, { fontWeight: "600", color: "#475569" }]}
          >
            Three
          </Animated.Text>
        </View>
        <Animated.View
          style={[
            indicatorStyle,
            {
              position: "absolute",
              bottom: 0,
              left: 4,
              width: TAB_WIDTH - 8,
              height: 2,
              backgroundColor: "#f97316",
              borderRadius: 1,
            },
          ]}
        />
      </View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-24 gap-4">
          <View className="rounded-xl bg-orange-100 p-6 mt-4">
            <Text className="text-lg font-bold text-orange-800">Section 1</Text>
            <Text className="mt-2 text-sm text-orange-700">
              Tab 1 active when scrollY is low
            </Text>
            <View className="mt-4 h-20 rounded-lg bg-orange-200/50" />
            <View className="mt-2 h-20 rounded-lg bg-orange-200/50" />
          </View>
          <View className="rounded-xl bg-slate-100 p-6">
            <Text className="text-lg font-bold text-slate-800">Section 2</Text>
            <Text className="mt-2 text-sm text-slate-600">
              Tab 2 active when scrollY 80–180
            </Text>
            <View className="mt-4 h-20 rounded-lg bg-slate-200" />
            <View className="mt-2 h-20 rounded-lg bg-slate-200" />
          </View>
          <View className="rounded-xl bg-slate-100 p-6">
            <Text className="text-lg font-bold text-slate-800">Section 3</Text>
            <Text className="mt-2 text-sm text-slate-600">
              Tab 3 active when scrollY 180+
            </Text>
            <View className="mt-4 h-20 rounded-lg bg-slate-200" />
            <View className="mt-2 h-20 rounded-lg bg-slate-200" />
            <View className="mt-2 h-16 rounded-lg bg-slate-200" />
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
