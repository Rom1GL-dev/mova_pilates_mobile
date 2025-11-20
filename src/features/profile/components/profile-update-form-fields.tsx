import { Controller, useFormContext } from "react-hook-form";
import { FormInput } from "@/components/form-input";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { UpdateProfileInput } from "@/features/profile/usecases/update-profile/update-profile";

export function FormFields() {
    const {
        control,
        formState: { errors },
    } = useFormContext<UpdateProfileInput>();
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    return (
        <>
            <Controller
                control={control}
                name="firstname"
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        label="Prénom"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Votre prénom"
                        error={errors.firstname?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="lastname"
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        label="Nom"
                        value={value}
                        onChangeText={onChange}
                        placeholder="Votre nom"
                        error={errors.lastname?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="tel"
                render={({ field: { onChange, value } }) => (
                    <FormInput
                        label="Téléphone"
                        value={value}
                        onChangeText={onChange}
                        placeholder="06 00 00 00 00"
                        keyboardType="phone-pad"
                        error={errors.tel?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name="dob"
                render={({ field: { onChange, value } }) => (
                    <View className={"mb-1"}>
                        <Text className="font-semibold text-[15px] mb-1">Date de naissance</Text>
                        <TouchableOpacity
                            className="bg-white border border-[#d8d8d8] rounded-xl px-4 py-3 text-[16px]"
                            onPress={() => setDatePickerVisible(true)}
                        >
                            <Text className="">{value ? dayjs(value).format("DD/MM/YYYY") : "JJ/MM/AAAA"}</Text>
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={datePickerVisible}
                            mode="date"
                            onConfirm={(date) => {
                                onChange(date);
                                setDatePickerVisible(false);
                            }}
                            onCancel={() => setDatePickerVisible(false)}
                        />
                    </View>
                )}
            />
        </>
    );
}
