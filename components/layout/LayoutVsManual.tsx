import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function LayoutVsManual() {
  const [showLayout, setShowLayout] = useState(true);
  const manualHeight = useSharedValue(80);

  const manualStyle = useAnimatedStyle(() => ({
    height: manualHeight.value,
  }));

  const toggleManual = () => {
    manualHeight.value = withTiming(manualHeight.value === 80 ? 140 : 80, {
      duration: 300,
    });
  };

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-6 text-center text-sm text-slate-500">
        Layout-driven vs manual withTiming
      </Text>

      <View className="mb-8">
        <Text className="mb-2 font-semibold text-slate-700">
          Layout (automatic)
        </Text>
        <Pressable onPress={() => setShowLayout((s) => !s)}>
          <Animated.View
            layout={LinearTransition.springify()}
            style={{
              height: showLayout ? 140 : 80,
              borderRadius: 12,
              backgroundColor: "#dcfce7",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text className="font-semibold text-slate-800">
              {showLayout ? "Expanded" : "Collapsed"}
            </Text>
            <Text className="mt-1 text-xs text-slate-500">Tap to toggle</Text>
          </Animated.View>
        </Pressable>
      </View>

      <View>
        <Text className="mb-2 font-semibold text-slate-700">
          Manual (withTiming)
        </Text>
        <Pressable onPress={toggleManual}>
          <Animated.View
            style={[
              manualStyle,
              {
                borderRadius: 12,
                backgroundColor: "#fef3c7",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text className="font-semibold text-slate-800">Manual height</Text>
            <Text className="mt-1 text-xs text-slate-500">Tap to animate</Text>
          </Animated.View>
        </Pressable>
      </View>

      <View className="mt-6 rounded-lg bg-slate-100 p-3">
        <Text className="text-xs text-slate-600">
          Layout: no refs, no measuring. Manual: you drive height with shared
          value.
        </Text>
      </View>
    </View>
  );
}
