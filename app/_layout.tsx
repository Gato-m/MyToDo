import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import React from "react";
import { ThemeProvider } from "../hooks/useTheme";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
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