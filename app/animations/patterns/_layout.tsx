import { Stack } from "expo-router";

export default function PatternsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="toggle" />
    </Stack>
  );
}
