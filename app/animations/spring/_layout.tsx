import { Stack } from "expo-router";

export default function SpringLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="overshoot" />
      <Stack.Screen name="gesture" />
    </Stack>
  );
}
