import React from "react";
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { Mail } from "lucide-react-native";

export function PasswordResetEmailField() {
    return (
        <View className="mb-6">
            <Text className="text-gray-700 mb-1">Adresse email</Text>

            <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                <Mail size={20} color="#999" />

                <Controller
                    name="email"
                    render={({ field: { onChange, value, onBlur } }) => (
                        <TextInput
                            placeholder="exemple@mail.com"
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            className="flex-1 text-base text-gray-800 py-3 ml-2"
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
            </View>
        </View>
    );
}
