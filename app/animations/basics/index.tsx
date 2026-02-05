import { Ionicons } from "@expo/vector-icons";
import { Route, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DEMOS = [
  {
    id: "translate",
    title: "Translate",
    description: "Move elements with translateX and translateY",
    path: "/animations/basics/translate",
  },
  {
    id: "opacity",
    title: "Opacity",
    description: "Fade in and out with opacity animations",
    path: "/animations/basics/opacity",
  },
];

export default function BasicsScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-6 pb-10 pt-6">
        <Text className="text-2xl font-bold text-slate-900">Basics</Text>
        <Text className="mt-2 text-slate-600">
          Fundamental animation concepts with Reanimated
        </Text>
      </View>

      <View className="px-6">
        <View className="gap-3">
          {DEMOS.map((demo) => (
            <TouchableOpacity
              key={demo.id}
              activeOpacity={0.7}
              onPress={() => router.push(demo.path as Route)}
              className="overflow-hidden rounded-2xl shadow-sm"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center p-5">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Ionicons name="play-circle" size={26} color="#059669" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-slate-900">
                    {demo.title}
                  </Text>
                  <Text className="mt-0.5 text-sm text-slate-600">
                    {demo.description}
                  </Text>
                </View>
                <View className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <Ionicons name="chevron-forward" size={20} color="#64748b" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
