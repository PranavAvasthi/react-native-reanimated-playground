import { Stack } from "expo-router";

export default function PatternsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="toggle" />
      <Stack.Screen name="progress-driven" />
      <Stack.Screen name="gesture-driven" />
      <Stack.Screen name="state-machine" />
    </Stack>
  );
}
