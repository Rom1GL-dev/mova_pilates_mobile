import React from "react";
import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { ROUTES } from "@/config/routes.config";
import { useRouter } from "expo-router";

export default function Onboarding() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#4B3B2A]">
            <StatusBar hidden />

            <ImageBackground source={require("../../../public/images/page.png")} className="absolute w-full h-full" />

            <View className="absolute inset-0 bg-[#4B3B2A]/30" />

            <View className="flex-1 justify-between pt-[50px] pb-[40px]">
                <View className="w-full items-end px-6">
                    <TouchableOpacity
                        className="h-10 w-10 rounded-full bg-black/40 items-center justify-center"
                        onPress={() => router.navigate(ROUTES.home.index)}
                    >
                        <Text>x</Text>
                    </TouchableOpacity>
                </View>

                <View className="flex-1 justify-center items-center px-8">
                    <Text className="text-white text-4xl font-bold uppercase tracking-wider text-center">
                        Infinity Pilates
                    </Text>
                    <Text className="text-white/80 text-center text-base mt-4 leading-6">
                        Exclusive ambiance, Pilates reformer, certified instructors, and visible results
                    </Text>
                </View>

                <View className="w-full px-6">
                    <TouchableOpacity
                        className="bg-white py-4 rounded-full"
                        onPress={() => router.navigate(ROUTES.register.index)}
                    >
                        <Text className="text-center text-[#8B5E3C] text-lg font-semibold">S’enregistrer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="py-4 rounded-full mt-2"
                        onPress={() => router.navigate(ROUTES.login.index)}
                    >
                        <Text className="text-center text-white text-base">
                            Vous avez déjà un compte ? <Text className={"font-bold"}>Connexion</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
