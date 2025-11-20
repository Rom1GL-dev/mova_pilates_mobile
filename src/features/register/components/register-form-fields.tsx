import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Platform } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { RegisterSchema } from "@/features/register/types/register";
import DateTimePicker from "@react-native-community/datetimepicker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";

export function RegisterFormFields() {
    const {
        control,
        formState: { errors },
    } = useFormContext<RegisterSchema>();
    const [showPassword, setShowPassword] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    return (
        <View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Prénom</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="person-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="firstname"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="John"
                                placeholderTextColor="#999"
                                className="flex-1 text-base text-gray-800 py-3 ml-2"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                {errors.firstname && <Text className="text-red-500 text-sm mt-1">{errors.firstname.message}</Text>}
            </View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Nom</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="person-outline" size={20} color="#999" />

                    <Controller
                        control={control}
                        name="lastname"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="Doe"
                                placeholderTextColor="#999"
                                className="flex-1 text-base text-gray-800 py-3 ml-2"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                {errors.lastname && <Text className="text-red-500 text-sm mt-1">{errors.lastname.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Date de naissance</Text>

                <Controller
                    control={control}
                    name="dob"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity
                                className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3 py-3"
                                onPress={() => setDatePickerVisible(true)}
                            >
                                <Ionicons name="calendar-outline" size={20} color="#999" />
                                <Text className="ml-2 text-base text-gray-800">
                                    {value ? dayjs(value).format("DD/MM/YYYY") : "JJ/MM/AAAA"}
                                </Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={datePickerVisible}
                                mode="date"
                                onConfirm={(date) => {
                                    const formatted = date.toISOString().split("T")[0];
                                    onChange(formatted);
                                    setDatePickerVisible(false);
                                }}
                                onCancel={() => setDatePickerVisible(false)}
                            />
                        </>
                    )}
                />

                {errors.dob && <Text className="text-red-500 text-sm mt-1">{errors.dob.message}</Text>}
            </View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Téléphone</Text>

                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="call-outline" size={20} color="#999" />

                    <Controller
                        control={control}
                        name="tel"
                        render={({ field: { onChange, value, onBlur } }) => (
                            <TextInput
                                placeholder="0X XX XX XX XX"
                                placeholderTextColor="#999"
                                className="flex-1 text-base text-gray-800 py-3 ml-2"
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                            />
                        )}
                    />
                </View>

                {errors.tel && <Text className="text-red-500 text-sm mt-1">{errors.tel.message}</Text>}
            </View>
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

            <View className="mb-4">
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
