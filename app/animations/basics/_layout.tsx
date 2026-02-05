import { Stack } from "expo-router";

export default function BasicsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="translate" />
      <Stack.Screen name="opacity" />
      <Stack.Screen name="scale-rotate" />
      <Stack.Screen name="multiple-transforms" />
    </Stack>
  );
}
