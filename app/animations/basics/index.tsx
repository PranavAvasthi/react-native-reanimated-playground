import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

export default function BasicsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-4 text-2xl font-bold text-gray-900">Basics</Text>
      <Text className="mb-8 text-center text-gray-600">
        Fundamental animation concepts will go here
      </Text>
      <Link href="/" asChild>
        <View className="rounded-lg bg-blue-500 px-6 py-3">
          <Text className="font-medium text-white">Back to Home</Text>
        </View>
      </Link>
    </View>
  );
}
