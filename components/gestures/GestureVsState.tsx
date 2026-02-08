import React, { useState } from "react";
import { Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

export function GestureVsState() {
  const sharedX = useSharedValue(0);
  const sharedY = useSharedValue(0);
  const [stateX, setStateX] = useState(0);
  const [stateY, setStateY] = useState(0);

  const sharedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sharedX.value }, { translateY: sharedY.value }],
  }));

  const sharedPan = Gesture.Pan()
    .onUpdate((e) => {
      sharedX.value = e.translationX;
      sharedY.value = e.translationY;
    })
    .onEnd(() => {
      sharedX.value = withSpring(0);
      sharedY.value = withSpring(0);
    });

  const statePan = Gesture.Pan()
    .onUpdate((e) => {
      scheduleOnRN(setStateX, e.translationX);
      scheduleOnRN(setStateY, e.translationY);
    })
    .onEnd(() => {
      scheduleOnRN(setStateX, 0);
      scheduleOnRN(setStateY, 0);
    });

  return (
    <View className="flex-1 items-center justify-center gap-8 px-6">
      <Text className="text-center text-sm text-slate-500">
        Shared value (top) vs React state (bottom)
      </Text>
      <View className="gap-6">
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-teal-600">
            useSharedValue (UI thread)
          </Text>
          <View className="h-24 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <GestureDetector gesture={sharedPan}>
              <Animated.View
                style={[
                  sharedStyle,
                  {
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "#14b8a6",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text className="text-lg text-white">⚡</Text>
              </Animated.View>
            </GestureDetector>
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-center text-xs font-medium text-slate-500">
            useState (JS thread)
          </Text>
          <View className="h-24 w-48 items-center justify-center rounded-2xl bg-slate-100">
            <GestureDetector gesture={statePan}>
              <View
                style={[
                  {
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    backgroundColor: "#64748b",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: [{ translateX: stateX }, { translateY: stateY }],
                  },
                ]}
              >
                <Text className="text-lg text-white">🐢</Text>
              </View>
            </GestureDetector>
          </View>
        </View>
      </View>
    </View>
  );
}
