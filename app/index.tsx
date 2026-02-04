import { Ionicons } from '@expo/vector-icons';
import { Route, useRouter } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SECTIONS = [
  {
    id: 'basics',
    title: 'Basics',
    description: 'Fundamental animation concepts',
    path: '/animations/basics',
  },
];

const App = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Header */}
        <View className="bg-white px-6 pb-10 pt-12">
          <View className="mb-4 flex-row items-center gap-2">
            <View className="rounded-lg bg-emerald-100 px-3 py-1.5">
              <Text className="text-xs font-semibold text-emerald-700">
                Open Source
              </Text>
            </View>
          </View>
          <Text className="text-3xl font-bold tracking-tight text-slate-900">
            Reanimated Playground
          </Text>
          <Text className="mt-3 text-base leading-6 text-slate-600">
            Learn React Native Reanimated through interactive examples. Explore
            animations, gestures, and patterns.
          </Text>
        </View>

        {/* Sections */}
        <View className="px-6 pt-2">
          <Text className="mb-4 text-sm font-semibold text-slate-500">
            Animations
          </Text>
          <View className="gap-3">
            {SECTIONS.map((section) => (
              <TouchableOpacity
                key={section.id}
                activeOpacity={0.7}
                onPress={() => router.push(section.path as Route)}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center p-5">
                  <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                    <Ionicons
                      name="play-circle"
                      size={26}
                      color="#059669"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-slate-900">
                      {section.title}
                    </Text>
                    <Text className="mt-0.5 text-sm text-slate-600">
                      {section.description}
                    </Text>
                  </View>
                  <View className="ml-3 h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#64748b"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
