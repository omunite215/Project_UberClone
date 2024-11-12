import { Stack } from "expo-router";

export default function RootLayout() {
  return (
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
        <Stack.Screen name="rides" options={{ headerShown: false }} />
      </Stack>
  );
}
