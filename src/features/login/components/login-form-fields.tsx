import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { LoginSchema } from "@/features/login/types/login";

export function LoginFormFields() {
    const {
        control,
        formState: { errors },
    } = useFormContext<LoginSchema>();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Email</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="mail-outline" size={20} color="#999" />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="loic@email.com"
                                placeholderTextColor="#999"
                                keyboardType="email-address"
                                className="flex-1 text-base text-gray-800 py-3 ml-2"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                {errors.email && <Text className="text-red-500 text-sm mt-1">{errors.email.message}</Text>}
            </View>

            <View className="mb-2">
                <Text className="text-gray-700 mb-1">Mot de passe</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="key-outline" size={20} color="#999" />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                                secureTextEntry={!showPassword}
                                className="flex-1 text-base text-gray-800 py-3 ml-2"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />

                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={22} color="#999" />
                    </TouchableOpacity>
                </View>

                {errors.password && <Text className="text-red-500 text-sm mt-1">{errors.password.message}</Text>}
            </View>
        </View>
    );
}
