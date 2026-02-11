import { Stack } from "expo-router";

export default function AdvancedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="animation-orchestration" />
    </Stack>
  );
}
