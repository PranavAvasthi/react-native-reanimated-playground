import { Stack } from "expo-router";

export default function SpringLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basics" />
      <Stack.Screen name="configs" />
      <Stack.Screen name="overshoot" />
      <Stack.Screen name="gesture" />
      <Stack.Screen name="chain" />
      <Stack.Screen name="comparison" />
    </Stack>
  );
}
