import { Reorder } from "@/components/layout/Reorder";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ReorderScreen() {
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
        <Text className="text-lg font-semibold text-slate-900">Reorder</Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-slate-200 px-6 py-4">
          <Text className="mt-1 text-sm text-slate-600">
            When list order changes, layout animation moves each item to its new
            position. Use a stable key (e.g. item id) so Reanimated can track
            views.
          </Text>
          <View className="mt-3 rounded-lg bg-slate-100 p-3">
            <Text className="font-mono text-xs text-slate-700">
              layout=LinearTransition.springify() on list items
            </Text>
            <Text className="mt-2 text-xs text-slate-600">
              Use ↑ ↓ to reorder, Reset to restore
            </Text>
          </View>
        </View>
        <Reorder />
      </ScrollView>
    </>
  );
}
