import { Stack } from "expo-router";

export default function AnimationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="basics" />
      <Stack.Screen name="timing" />
      <Stack.Screen name="spring" />
      <Stack.Screen name="derived" />
      <Stack.Screen name="interpolate" />
    </Stack>
  );
}
