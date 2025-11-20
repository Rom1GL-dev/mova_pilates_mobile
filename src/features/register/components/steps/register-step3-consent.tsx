import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { RegisterSchema } from "@/features/register/types/register";

export function RegisterStep3Consent() {
    const {
        control,
        formState: { errors },
    } = useFormContext<RegisterSchema>();

    return (
        <View className="mt-4">
            <Controller
                control={control}
                name="acceptTerms"
                render={({ field: { value, onChange } }) => (
                    <TouchableOpacity className="flex-row items-center gap-2 mt-4" onPress={() => onChange(!value)}>
                        <View
                            className={`w-5 h-5 rounded border 
                ${value ? "bg-[#b28053] border-[#b28053]" : "border-gray-400"}`}
                        ></View>
                        <Text className="text-gray-700">J’accepte la création de mon compte</Text>
                    </TouchableOpacity>
                )}
            />
            {errors.acceptTerms && <Text className="text-red-500 mt-1">{errors.acceptTerms.message}</Text>}
        </View>
    );
}
