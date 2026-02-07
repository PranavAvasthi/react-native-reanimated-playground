import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { Route, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const DEMOS = [
  {
    id: "basics",
    title: "Basics",
    description: "withSpring and natural bounce",
    path: ROUTES.ANIMATIONS.SPRING.BASICS,
  },
  {
    id: "overshoot",
    title: "Overshoot",
    description: "overshootClamping for no bounce",
    path: ROUTES.ANIMATIONS.SPRING.OVERSHOOT,
  },
  {
    id: "gesture",
    title: "Gesture",
    description: "Spring with drag and release",
    path: ROUTES.ANIMATIONS.SPRING.GESTURE,
  },
];

export default function SpringScreen() {
  const router = useRouter();

  return (
    <>
      <View className="flex-row items-center border-b border-slate-200 bg-white px-4 py-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 rounded-full p-2"
        >
          <Ionicons name="arrow-back" size={24} color="#334155" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-slate-900">Spring</Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pb-10 pt-6">
          <Text className="text-2xl font-bold text-slate-900">Spring</Text>
          <Text className="mt-2 text-slate-600">
            Physics-based animations with withSpring
          </Text>
        </View>

        <View className="px-6">
          <View className="gap-3">
            {DEMOS.map((demo) => (
              <TouchableOpacity
                key={demo.id}
                activeOpacity={0.7}
                onPress={() => router.navigate(demo.path as Route)}
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
                  <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                    <Ionicons name="basketball" size={26} color="#f59e0b" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-slate-900">
                      {demo.title}
                    </Text>
                    <Text className="mt-0.5 text-sm text-slate-600">
                      {demo.description}
                    </Text>
                  </View>
                  <View className="ml-3 shrink-0 justify-center self-stretch">
                    <View className="h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#64748b"
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
