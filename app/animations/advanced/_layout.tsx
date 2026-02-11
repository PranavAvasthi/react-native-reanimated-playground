import { Stack } from "expo-router";

export default function AdvancedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="animation-orchestration" />
      <Stack.Screen name="interruptible-animations" />
      <Stack.Screen name="physics-tuning-playground" />
      <Stack.Screen name="animated-state-machine" />
      <Stack.Screen name="cross-component-sync" />
      <Stack.Screen name="gesture-velocity-prediction" />
    </Stack>
  );
}
