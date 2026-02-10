import { Stack } from "expo-router";

export default function ScrollLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="collapsing-header" />
      <Stack.Screen name="parallax-image" />
      <Stack.Screen name="progress" />
    </Stack>
  );
}
