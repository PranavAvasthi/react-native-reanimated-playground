import { Stack } from "expo-router";

export default function ListLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="enter-exit" />
      <Stack.Screen name="reorder" />
      <Stack.Screen name="swipe-to-delete" />
      <Stack.Screen name="animated-flat-list" />
      <Stack.Screen name="large-list-performance" />
    </Stack>
  );
}
