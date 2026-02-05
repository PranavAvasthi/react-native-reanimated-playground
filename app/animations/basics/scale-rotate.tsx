import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ScaleRotate } from "../../../components/basics/ScaleRotate";

export default function ScaleRotateScreen() {
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
          Scale & Rotate
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-slate-200 px-6 py-4">
          <Text className="mt-1 text-sm text-slate-600">
            Resize and rotate elements. Scale: 1 = normal, {">"}1 = larger.
            Rotate in degrees.
          </Text>
          <View className="mt-3 rounded-lg bg-slate-100 p-3">
            <Text className="font-mono text-xs text-slate-700">
              useSharedValue • useAnimatedStyle • withSpring
            </Text>
            <Text className="mt-2 text-xs text-slate-600">
              transform: [scale, rotate] — order affects result
            </Text>
          </View>
        </View>
        <ScaleRotate />
      </ScrollView>
    </>
  );
}
