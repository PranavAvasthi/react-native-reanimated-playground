import { Stack } from "expo-router";

export default function GesturesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="pan-gesture-basics" />
      <Stack.Screen name="drag-with-boundaries" />
      <Stack.Screen name="swipe-to-dismiss" />
    </Stack>
  );
}
