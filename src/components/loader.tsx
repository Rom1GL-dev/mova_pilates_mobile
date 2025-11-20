import React from "react";
import { ActivityIndicator, ImageBackground, StatusBar, Text, View } from "react-native";

export default function Loader() {
    return (
        <View className="flex-1 bg-[#4B3B2A]">
            <StatusBar hidden />

            <ImageBackground
                source={require("../../public/images/page.png")}
                className="absolute w-full h-full"
                resizeMode="cover"
            />

            <View className="absolute inset-0 bg-[#4B3B2A]/50" />

            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#fff" />
                <Text className="mt-4 text-white text-lg font-semibold">Chargement...</Text>
            </View>
        </View>
    );
}

export function FullScreenLoader() {
    return (
        <View className="absolute inset-0 bg-black/30 items-center justify-center z-50">
            <ActivityIndicator size="large" color="#b28053" />
        </View>
    );
}
