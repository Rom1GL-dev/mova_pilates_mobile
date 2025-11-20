import React from "react";
import { Text, View } from "react-native";

export function RegisterProgressBar({ step }: { step: number }) {
    return (
        <View className={"flex flex-col items-center mb-8"}>
            <View className="flex-row justify-center mb-3 mt-2">
                {[1, 2, 3].map((i) => (
                    <View
                        key={i}
                        className={`h-2 rounded-full mx-1 ${step >= i ? "w-8 bg-[#b28053]" : "w-8 bg-gray-300"}`}
                    />
                ))}
            </View>
            <Text className="text-gray-500 mt-1">Étape {step} / 3</Text>
        </View>
    );
}
