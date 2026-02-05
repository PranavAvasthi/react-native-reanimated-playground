import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MultipleTransforms } from "../../../components/basics/MultipleTransforms";

export default function MultipleTransformsScreen() {
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
          Multiple Transforms
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-slate-200 px-6 py-4">
          <Text className="mt-1 text-sm text-slate-600">
            Combine translate, scale, rotate, and opacity in one animation.
          </Text>
          <View className="mt-3 rounded-lg bg-slate-100 p-3">
            <Text className="font-mono text-xs text-slate-700">
              withSpring + withTiming for different properties
            </Text>
            <Text className="mt-2 text-xs text-slate-600">
              Stack transforms: [translateX, translateY, scale, rotate]
            </Text>
          </View>
        </View>
        <MultipleTransforms />
      </ScrollView>
    </>
  );
}
