import { SwipeToDelete } from "@/components/list/SwipeToDelete";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SwipeToDeleteScreen() {
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
          Swipe to Delete
        </Text>
      </View>
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-slate-200 px-6 py-4">
          <Text className="mt-1 text-sm text-slate-600">
            Pan gesture moves the row; a delete action is revealed behind.
            Swipe left past the threshold to reveal, then tap Delete.
          </Text>
          <View className="mt-3 rounded-lg bg-slate-100 p-3">
            <Text className="font-mono text-xs text-slate-700">
              Gesture.Pan() + translateX
            </Text>
            <Text className="mt-2 text-xs text-slate-600">
              Swipe left on a row
            </Text>
          </View>
        </View>
        <SwipeToDelete />
      </ScrollView>
    </>
  );
}
