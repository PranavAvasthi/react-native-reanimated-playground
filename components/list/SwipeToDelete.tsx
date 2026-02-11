import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  FadeOutLeft,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const ROW_HEIGHT = 64;
const DELETE_WIDTH = 80;

function Row({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) {
  const translateX = useSharedValue(0);

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .onUpdate((e) => {
      if (e.translationX < 0) {
        translateX.value = Math.max(-DELETE_WIDTH, e.translationX);
      } else {
        translateX.value = Math.min(0, e.translationX);
      }
    })
    .onEnd((e) => {
      if (e.translationX < -DELETE_WIDTH / 2 || e.velocityX < -200) {
        translateX.value = withSpring(-DELETE_WIDTH);
      } else {
        translateX.value = withSpring(0);
      }
    });

  return (
    <View style={{ height: ROW_HEIGHT, marginHorizontal: 24, marginVertical: 4, overflow: "hidden", borderRadius: 12 }}>
      <View
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: DELETE_WIDTH,
          backgroundColor: "#e11d48",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
        }}
      >
        <Pressable onPress={onDelete}>
          <Text className="font-semibold text-white">Delete</Text>
        </Pressable>
      </View>
      <GestureDetector gesture={pan}>
        <Animated.View
          exiting={FadeOutLeft.duration(200)}
          style={[
            rowStyle,
            {
              height: ROW_HEIGHT,
              backgroundColor: "#fae8ff",
              borderRadius: 12,
              paddingHorizontal: 16,
              justifyContent: "center",
            },
          ]}
        >
          <Text className="font-semibold text-slate-800">{label}</Text>
          <Text className="text-xs text-slate-500">Swipe left to delete</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export function SwipeToDelete() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry", "Date"]);

  const remove = (index: number) =>
    setItems((prev) => prev.filter((_, i) => i !== index));

  return (
    <View className="flex-1 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Swipe left to reveal delete
      </Text>
      {items.map((label, index) => (
        <Row key={label} label={label} onDelete={() => remove(index)} />
      ))}
    </View>
  );
}
