import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/features/login/types/login";
import { useLogin } from "@/features/login/api/use-login";
import { useRouter } from "expo-router";
import { ROUTES } from "@/config/routes.config";
import { X } from "lucide-react-native";
import { LoginFormFields } from "@/features/login/components/login-form-fields";
import { LOGIN_ERROR } from "@/features/login/types/login-error";
import * as SecureStore from "expo-secure-store";

export function Login() {
    const router = useRouter();
    const loginMutation = useLogin();

    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const methods = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginSchema) => {
        setApiError(null);
        setSuccess(false);

        loginMutation.mutate(values, {
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
                <View className="mb-6 flex flex-row justify-between">
                    <View>
                        <Text className="text-4xl font-bold text-[#1C1C1E]">Mova Pilates</Text>
                        <Text className="text-lg text-gray-600">Connectez-vous à votre compte</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => router.navigate(ROUTES.home.index as never)}
                        className={"h-10 w-10"}
                    >
                        <X />
                    </TouchableOpacity>
                </View>

                <FormProvider {...methods}>
                    <LoginFormFields />
                </FormProvider>

                <TouchableOpacity className="items-end mb-6 mt-1">
                    <Text className="text-[#b28053] font-medium">Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={methods.handleSubmit(onSubmit)}
                    disabled={loginMutation.isPending}
                    className={`rounded-2xl items-center py-4 ${
                        loginMutation.isPending ? "bg-gray-400" : "bg-[#b28053]"
                    }`}
                >
                    <Text className="text-white text-base font-semibold">
                        {success ? "Connexion réussi..." : loginMutation.isPending ? "Connexion..." : "Connexion"}
                    </Text>
                </TouchableOpacity>

                {apiError && <Text className="text-red-500 text-center mt-3">{apiError}</Text>}

                <TouchableOpacity
                    className="flex-row justify-center mt-4"
                    onPress={() => router.navigate(ROUTES.register.index as never)}
                >
                    <Text className="text-gray-600">Pas encore de compte ? </Text>
                    <Text className="text-[#b28053] font-semibold">S&apos;inscrire</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
