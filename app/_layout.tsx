import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";
import { LoadingProvider } from "@/providers/loading-provider";

export default function RootLayout() {
    return (
        <LoadingProvider>
            <QueryClientProvider client={queryClient}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                    <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="register" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
            </QueryClientProvider>
        </LoadingProvider>
    );
}
