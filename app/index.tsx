import { ROUTES } from "@/constants/routes";
import { Ionicons } from "@expo/vector-icons";
import { Route, useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const SECTIONS = [
  {
    id: "basics",
    title: "Basics",
    description: "Fundamental animation concepts",
    path: ROUTES.ANIMATIONS.BASICS.INDEX,
    icon: "play-circle" as const,
    iconBg: "bg-emerald-100",
    iconColor: "#059669",
  },
  {
    id: "timing",
    title: "Timing",
    description: "withTiming, easing, sequence & more",
    path: ROUTES.ANIMATIONS.TIMING.INDEX,
    icon: "time" as const,
    iconBg: "bg-violet-100",
    iconColor: "#7c3aed",
  },
  {
    id: "spring",
    title: "Spring",
    description: "withSpring, physics-based bounce",
    path: ROUTES.ANIMATIONS.SPRING.INDEX,
    icon: "basketball" as const,
    iconBg: "bg-amber-100",
    iconColor: "#f59e0b",
  },
  {
    id: "derived",
    title: "Derived",
    description: "useDerivedValue, computed from shared values",
    path: ROUTES.ANIMATIONS.DERIVED.INDEX,
    icon: "layers" as const,
    iconBg: "bg-sky-100",
    iconColor: "#0ea5e9",
  },
  {
    id: "interpolate",
    title: "Interpolate",
    description: "Map values between ranges, colors, scroll",
    path: ROUTES.ANIMATIONS.INTERPOLATE.INDEX,
    icon: "swap-horizontal" as const,
    iconBg: "bg-rose-100",
    iconColor: "#f43f5e",
  },
  {
    id: "gestures",
    title: "Gestures",
    description: "Pan, drag, swipe with react-native-gesture-handler",
    path: ROUTES.ANIMATIONS.GESTURES.INDEX,
    icon: "hand-left" as const,
    iconBg: "bg-teal-100",
    iconColor: "#14b8a6",
  },
  {
    id: "patterns",
    title: "Patterns",
    description: "Toggle, progress-driven, hooks & more",
    path: ROUTES.ANIMATIONS.PATTERNS.INDEX,
    icon: "git-merge" as const,
    iconBg: "bg-indigo-100",
    iconColor: "#6366f1",
  },
  {
    id: "scroll",
    title: "Scroll",
    description: "Scroll-driven animations, header, parallax",
    path: ROUTES.ANIMATIONS.SCROLL.INDEX,
    icon: "swap-vertical" as const,
    iconBg: "bg-orange-100",
    iconColor: "#f97316",
  },
  {
    id: "layout",
    title: "Layout",
    description: "Layout animations, enter/exit, reorder",
    path: ROUTES.ANIMATIONS.LAYOUT.INDEX,
    icon: "resize" as const,
    iconBg: "bg-lime-100",
    iconColor: "#84cc16",
  },
  {
    id: "list",
    title: "List",
    description: "List animations, FlatList, swipe to delete",
    path: ROUTES.ANIMATIONS.LIST.INDEX,
    icon: "list" as const,
    iconBg: "bg-fuchsia-100",
    iconColor: "#c026d3",
  },
];

const App = () => {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ paddingBottom: 48 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Header */}
      <View className="px-6 pb-10 pt-12">
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
              onPress={() => router.navigate(section.path as Route)}
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
                <View
                  className={`mr-4 h-12 w-12 shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}
                >
                  <Ionicons
                    name={section.icon}
                    size={26}
                    color={section.iconColor}
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
  );
};

export default App;
