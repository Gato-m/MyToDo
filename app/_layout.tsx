import { Stack } from "expo-router";
import { ThemeProvider } from "../hooks/useTheme";
import React from "react";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}

// export default function RootLayout() {
//   return <Stack
//     screenOptions={{
//       headerShown: false,
//     }}
//   />;
// }

//    <Stack.Screen name="index" options={{ title: "Home" }} />
// <Stack.Screen name="about" options={{ title: "About" }} />