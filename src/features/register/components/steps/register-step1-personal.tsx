import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import dayjs from "dayjs";
import { RegisterSchema } from "@/features/register/types/register";

export function RegisterStep1Personal() {
    const {
        control,
        formState: { errors },
    } = useFormContext<RegisterSchema>();
    const [visible, setVisible] = useState(false);

    return (
        <View>
            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Prénom</Text>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="person-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="firstname"
                        render={({ field }) => (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="John"
                                className="flex-1 py-3 ml-2"
                            />
                        )}
                    />
                </View>
                {errors.firstname && <Text className="text-red-500">{errors.firstname.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Nom</Text>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="person-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="lastname"
                        render={({ field }) => (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="Doe"
                                className="flex-1 py-3 ml-2"
                            />
                        )}
                    />
                </View>
                {errors.lastname && <Text className="text-red-500">{errors.lastname.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Date de naissance</Text>
                <Controller
                    control={control}
                    name="dob"
                    render={({ field }) => (
                        <>
                            <TouchableOpacity
                                className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3 py-3"
                                onPress={() => setVisible(true)}
                            >
                                <Ionicons name="calendar-outline" size={20} color="#999" />
                                <Text className="ml-2 text-base">
                                    {field.value ? dayjs(field.value).format("DD/MM/YYYY") : "JJ/MM/AAAA"}
                                </Text>
                            </TouchableOpacity>

                            <DateTimePickerModal
                                isVisible={visible}
                                mode="date"
                                onConfirm={(date) => {
                                    field.onChange(date.toISOString());
                                    setVisible(false);
                                }}
                                onCancel={() => setVisible(false)}
                            />
                        </>
                    )}
                />
                {errors.dob && <Text className="text-red-500">{errors.dob.message}</Text>}
            </View>

            <View className="mb-4">
                <Text className="text-gray-700 mb-1">Téléphone</Text>
                <View className="flex-row items-center bg-white border border-gray-300 rounded-xl px-3">
                    <Ionicons name="call-outline" size={20} color="#999" />
                    <Controller
                        control={control}
                        name="tel"
                        render={({ field }) => (
                            <TextInput
                                value={field.value}
                                onChangeText={field.onChange}
                                onBlur={field.onBlur}
                                placeholder="06 12 34 56 78"
                                className="flex-1 py-3 ml-2"
                            />
                        )}
                    />
                </View>
                {errors.tel && <Text className="text-red-500">{errors.tel.message}</Text>}
            </View>
        </View>
    );
}
