import { CollapsingHeader } from "@/components/scroll/CollapsingHeader";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function CollapsingHeaderScreen() {
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
        <Text className="text-lg font-semibold text-slate-900">
          Collapsing Header
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-slate-200 px-6 py-4">
          <Text className="mt-1 text-sm text-slate-600">
            Interpolate header height from scroll position. Shrinks from 120px to
            56px as you scroll. Title fades out for a compact look.
          </Text>
          <View className="mt-3 rounded-lg bg-slate-100 p-3">
            <Text className="font-mono text-xs text-slate-700">
              height = interpolate(scrollY, [0, 64], [120, 56])
            </Text>
            <Text className="mt-2 text-xs text-slate-600">
              Scroll to collapse the header
            </Text>
          </View>
        </View>
        <CollapsingHeader />
      </ScrollView>
    </>
  );
}
