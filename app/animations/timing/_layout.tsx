import { Stack } from "expo-router";

export default function TimingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basic-timing" />
      <Stack.Screen name="easing" />
      <Stack.Screen name="sequence" />
      <Stack.Screen name="delay-repeat" />
      <Stack.Screen name="interruption" />
    </Stack>
  );
}
