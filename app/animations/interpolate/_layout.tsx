import { Stack } from "expo-router";

export default function InterpolateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="clamp" />
      <Stack.Screen name="multi-step" />
      <Stack.Screen name="scroll" />
    </Stack>
  );
}
