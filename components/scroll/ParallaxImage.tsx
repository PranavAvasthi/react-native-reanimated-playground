import React from "react";
import { Image, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const IMAGE_HEIGHT = 220;
const CONTAINER_HEIGHT = 480;

export function ParallaxImage() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, IMAGE_HEIGHT],
          [0, IMAGE_HEIGHT * 0.5],
          "clamp",
        ),
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
        <View style={{ height: IMAGE_HEIGHT, overflow: "hidden" }}>
          <Animated.View
            style={[
              imageStyle,
              {
                height: IMAGE_HEIGHT * 1.5,
                width: "100%",
              },
            ]}
          >
            <Image
              source={{ uri: "https://picsum.photos/800/330" }}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "cover",
              }}
            />
          </Animated.View>
        </View>
        <View className="px-6 py-4 -mt-8 rounded-t-2xl bg-white">
          <Text className="text-sm font-medium text-orange-600">
            Parallax—image moves at 0.5x scroll speed
          </Text>
        </View>
        <View className="px-6 gap-3 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} className="rounded-xl bg-slate-100 p-4">
              <Text className="font-semibold text-slate-900">Content {i}</Text>
              <Text className="mt-1 text-sm text-slate-600">
                Image moves at 0.5x scroll speed for depth effect
              </Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
}
