import React from "react";
import { Tabs } from "expo-router";
import { AuthProvider, ProtectedRoute } from "@/providers/auth-provider";
import { Calendar, Compass, Home, User } from "lucide-react-native";

export default function TabsLayout() {
    return (
        <AuthProvider>
            <ProtectedRoute>
                <Tabs
                    screenOptions={{
                        headerShown: false,
                        tabBarShowLabel: false,
                        tabBarStyle: {
                            height: 70,
                            top: "auto",
                            paddingBottom: 10,
                            paddingTop: 10,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        tabBarActiveTintColor: "#b28053",
                        tabBarInactiveTintColor: "#A0A0A0",
                    }}
                >
                    <Tabs.Screen
                        name="home"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <Home size={26} color={color} strokeWidth={focused ? 2.5 : 1.8} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="navigation"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <Compass size={26} color={color} strokeWidth={focused ? 2.5 : 1.8} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="calendar"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <Calendar size={26} color={color} strokeWidth={focused ? 2.5 : 1.8} />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="profile/index"
                        options={{
                            tabBarIcon: ({ color, focused }) => (
                                <User size={26} color={color} strokeWidth={focused ? 2.5 : 1.8} />
                            ),
                        }}
                    />
                    <Tabs.Screen name="profile/settings" options={{ href: null }} />
                    <Tabs.Screen name="profile/update" options={{ href: null }} />
                    <Tabs.Screen name="profile/courses" options={{ href: null }} />
                </Tabs>
            </ProtectedRoute>
        </AuthProvider>
    );
}
