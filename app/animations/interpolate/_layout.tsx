import { Stack } from "expo-router";

export default function InterpolateLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
    </Stack>
  );
}
