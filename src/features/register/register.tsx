import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/config/routes.config";
import { LOGIN_ERROR } from "@/features/login/types/login-error";
import { X } from "lucide-react-native";
import { RegisterFormFields } from "@/features/register/components/register-form-fields";
import { RegisterSchema, registerSchema } from "@/features/register/types/register";
import { useRegister } from "@/features/register/api/use-register";
import * as SecureStore from "expo-secure-store";

export function Register() {
    const router = useRouter();
    const registerMutation = useRegister();

    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            tel: "",
            dob: new Date(),
            email: "",
            password: "",
        },
    });

    const onSubmit = (data: RegisterSchema) => {
        setApiError(null);
        setSuccess(false);

        registerMutation.mutate(data, {
            onSuccess: async (data) => {
                try {
                    setSuccess(true);
                    await SecureStore.setItemAsync("sessionId", data?.sessionId);

                    router.replace(ROUTES.home.index as never);
                } catch (e) {
                    console.log("SecureStore error", e);
                }
            },
            onError: (error: any) => {
                const errorMessage = error?.message as string;
                setApiError(LOGIN_ERROR[errorMessage] || "Une erreur est survenue. Veuillez réessayer.");
            },
        });
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-white">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingHorizontal: 24,
                    paddingTop: 70,
                    paddingBottom: 45,
                }}
            >
                <View className="mb-6 flex flex-row  justify-between">
                    <View>
                        <Text className="text-4xl font-bold text-[#1C1C1E]">Mova Pilates</Text>
                        <Text className="text-lg text-gray-600">Création de compte</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.navigate(ROUTES.home.index as never)}
                        className={"h-10 w-10"}
                    >
                        <X />
                    </TouchableOpacity>
                </View>

                <FormProvider {...methods}>
                    <RegisterFormFields />
                </FormProvider>

                <TouchableOpacity
                    onPress={methods.handleSubmit(onSubmit)}
                    disabled={registerMutation.isPending}
                    className={`rounded-2xl items-center py-4 mt-6 ${
                        registerMutation.isPending ? "bg-gray-400" : "bg-[#b28053]"
                    }`}
                >
                    <Text className="text-white text-base font-semibold">
                        {success
                            ? "Inscription réussi..."
                            : registerMutation.isPending
                              ? "Inscription..."
                              : "Inscription"}
                    </Text>
                </TouchableOpacity>

                {apiError && <Text className="text-red-500 text-center mt-3">{apiError}</Text>}

                <TouchableOpacity
                    className="flex-row justify-center mt-4"
                    onPress={() => router.navigate(ROUTES.login.index as never)}
                >
                    <Text className="text-gray-600">Vous avez déjà un compte ? </Text>
                    <Text className="text-[#b28053] font-semibold">Se connecter</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
