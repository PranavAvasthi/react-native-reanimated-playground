import { Stack } from "expo-router";

export default function TimingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="basic-timing" />
    </Stack>
  );
}
