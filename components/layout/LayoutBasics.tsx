import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

export function LayoutBasics() {
  const [big, setBig] = useState(false);

  return (
    <View className="flex-1 items-center justify-center gap-6 px-6">
      <Text className="text-center text-sm text-slate-500">
        Tap the box—layout animates size change
      </Text>
      <Pressable onPress={() => setBig((b) => !b)}>
        <Animated.View
          layout={LinearTransition.springify().stiffness(120)}
          style={{
            width: big ? 160 : 80,
            height: big ? 160 : 80,
            borderRadius: 16,
            backgroundColor: "#84cc16",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text className="text-2xl text-white">{big ? "📦" : "📄"}</Text>
        </Animated.View>
      </Pressable>
      <Text className="text-center text-xs text-slate-500">
        layout=LinearTransition.springify()
      </Text>
    </View>
  );
}
