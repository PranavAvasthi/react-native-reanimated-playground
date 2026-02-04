import { Stack } from 'expo-router';

export default function AnimationsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="basics" />
    </Stack>
  );
}
