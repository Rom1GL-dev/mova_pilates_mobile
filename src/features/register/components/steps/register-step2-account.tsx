import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { RegisterSchema } from "@/features/register/types/register";

export function RegisterStep2Account() {
    const {
        control,
        formState: { errors },
    } = useFormContext<RegisterSchema>();
    const [showPass, setShowPass] = useState(false);

    return (
        <View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Email</Text>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="mail-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field }) => (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="email@example.com"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                className="flex-1 py-3 ml-2"
                            />
                        )}
                    />
                </View>
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Mot de passe</Text>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="key-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="••••••••"
                                secureTextEntry={!showPass}
                                className="flex-1 py-3 ml-2"
                            />
                        )}
                    />
                    <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                        <Ionicons name={showPass ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                    </TouchableOpacity>
                </View>
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>
        </View>
    );
}
