import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyRound, ShieldCheck } from "lucide-react-native";

export function PasswordResetVerifyFields() {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            {/* OTP */}
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Code de vérification</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <ShieldCheck size={20} color="#999" />

                    <Controller
                        name="otp"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="123456"
                                placeholderTextColor="#999"
                                keyboardType="number-pad"
                                maxLength={6}
                                className="flex-1 text-base text-gray-800 py-3 ml-2 tracking-[0.2em]"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>
            </View>

            {/* NEW PASSWORD */}
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Nouveau mot de passe</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <KeyRound size={20} color="#999" />

                    <Controller
                        name="newPassword"
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
                        <Text className="text-[#b28053] font-semibold">{showPassword ? "Masquer" : "Voir"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
