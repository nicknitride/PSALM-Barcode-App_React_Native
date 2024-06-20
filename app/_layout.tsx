import { Stack } from "expo-router";
import Home from "./Home";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}></Stack.Screen>
    </Stack>
  );
}
