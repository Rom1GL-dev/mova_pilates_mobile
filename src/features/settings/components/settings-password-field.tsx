import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface PasswordFieldProps {
    control: any;
    name: string;
    label?: string;
    error?: string;
}

export function SettingsPasswordField({ control, name, label = "Mot de passe", error }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="mb-2">
            <Text className="text-gray-700 mb-1">{label}</Text>

            <View
                className={`flex-row items-center bg-white border rounded-xl px-3 ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            >
                <Ionicons name="key-outline" size={20} color={error ? "#ff5656" : "#999"} />

                <Controller
                    control={control}
                    name={name}
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
                    <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={22}
                        color={error ? "#ff5656" : "#999"}
                    />
                </TouchableOpacity>
            </View>

            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
}
