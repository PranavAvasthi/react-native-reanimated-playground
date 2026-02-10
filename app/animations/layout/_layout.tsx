import { Stack } from "expo-router";

export default function LayoutAnimationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="enter-exit" />
      <Stack.Screen name="expand-collapse" />
      <Stack.Screen name="reorder" />
    </Stack>
  );
}
