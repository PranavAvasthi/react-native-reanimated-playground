import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

export function ExpandCollapse() {
  const [expanded, setExpanded] = useState<number | null>(0);

  const sections = [
    {
      id: 0,
      title: "Section 1",
      body: "Layout animates height when you expand or collapse.",
    },
    {
      id: 1,
      title: "Section 2",
      body: "No manual height animation—just toggle state.",
    },
    {
      id: 2,
      title: "Section 3",
      body: "Reanimated Layout handles the transition.",
    },
  ];

  return (
    <View className="flex-1 px-6 pt-6">
      <Text className="mb-4 text-center text-sm text-slate-500">
        Tap a section to expand or collapse
      </Text>
      <View className="gap-3">
        {sections.map(({ id, title, body }) => (
          <Animated.View
            key={id}
            layout={LinearTransition.springify().stiffness(120)}
            style={{
              borderRadius: 12,
              backgroundColor: "#dcfce7",
              overflow: "hidden",
            }}
          >
            <Pressable
              onPress={() => setExpanded((e) => (e === id ? null : id))}
              style={{ padding: 16 }}
            >
              <Text className="font-semibold text-slate-800">{title}</Text>
              <Text className="mt-1 text-xs text-slate-500">
                {expanded === id ? "Tap to collapse" : "Tap to expand"}
              </Text>
            </Pressable>
            {expanded === id && (
              <Animated.View
                layout={LinearTransition.springify()}
                style={{ paddingHorizontal: 16, paddingBottom: 16 }}
              >
                <Text className="text-sm text-slate-600">{body}</Text>
              </Animated.View>
            )}
          </Animated.View>
        ))}
      </View>
    </View>
  );
}
