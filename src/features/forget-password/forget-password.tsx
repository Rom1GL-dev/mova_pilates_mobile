import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/config/routes.config";
import { useForgetPasswordRequest } from "@/features/forget-password/usecases/forgot-password/use-forgot-password-request";
import { useForgetPasswordVerify } from "./usecases/forgot-password/use-forgot-password-verify";
import {
    forgotPasswordEmailSchema,
    ForgotPasswordEmailSchema,
    ForgotPasswordVerifySchema,
    forgotPasswordVerifySchema,
} from "@/features/forget-password/usecases/forgot-password/forgot-password-types";
import { PasswordResetEmailField } from "@/features/forget-password/components/password-reset-email-field";
import { PasswordResetVerifyFields } from "@/features/forget-password/components/password-reset-verify-fields";

export function ForgetPassword() {
    const router = useRouter();

    const requestMutation = useForgetPasswordRequest();
    const verifyMutation = useForgetPasswordVerify();

    const [step, setStep] = useState<1 | 2>(1);
    const [emailStored, setEmailStored] = useState<string>("");
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const methodsEmail = useForm<ForgotPasswordEmailSchema>({
        resolver: zodResolver(forgotPasswordEmailSchema),
        defaultValues: {
            email: "",
        },
    });

    const methodsVerify = useForm<ForgotPasswordVerifySchema>({
        resolver: zodResolver(forgotPasswordVerifySchema),
        defaultValues: {
            otp: "",
            newPassword: "",
        },
    });

    const submitEmail = (data: ForgotPasswordEmailSchema) => {
        setApiError(null);
        setSuccess(false);

        requestMutation.mutate(data, {
            onSuccess: () => {
                setEmailStored(data.email);
                setStep(2);
            },
            onError: (error: any) => {
                setApiError(error?.message || "Une erreur est survenue.");
            },
        });
    };

    const submitVerify = (data: ForgotPasswordVerifySchema) => {
        setApiError(null);
        setSuccess(false);

        verifyMutation.mutate(
            {
                email: emailStored,
                otp: data.otp,
                newPassword: data.newPassword,
            },
            {
                onSuccess: () => {
                    setSuccess(true);

                    setTimeout(() => {
                        router.replace(ROUTES.login.index as never);
                    }, 1000);
                },
                onError: (error: any) => {
                    setApiError(error?.message || "Code OTP incorrect ou expiré.");
                },
            },
        );
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
                        <Text className="text-4xl font-bold text-[#1C1C1E]">Mot de passe oublié</Text>
                        <Text className="text-lg text-gray-600">Récupérez votre compte</Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.replace(ROUTES.login.index as never)}
                        className={"h-10 w-10"}
                    >
                        <X />
                    </TouchableOpacity>
                </View>

                {/* STEP 1 — EMAIL */}
                {step === 1 && (
                    <FormProvider {...methodsEmail}>
                        <PasswordResetEmailField />
                        <TouchableOpacity
                            onPress={methodsEmail.handleSubmit(submitEmail)}
                            disabled={requestMutation.isPending}
                            className={`rounded-2xl items-center py-4 ${
                                requestMutation.isPending ? "bg-gray-400" : "bg-[#b28053]"
                            }`}
                        >
                            <Text className="text-white text-base font-semibold">
                                {requestMutation.isPending ? "Envoi..." : "Envoyer le code"}
                            </Text>
                        </TouchableOpacity>
                    </FormProvider>
                )}

                {step === 2 && (
                    <FormProvider {...methodsVerify}>
                        <PasswordResetVerifyFields />

                        <TouchableOpacity
                            onPress={methodsVerify.handleSubmit(submitVerify)}
                            disabled={verifyMutation.isPending}
                            className={`rounded-2xl items-center py-4 ${
                                verifyMutation.isPending ? "bg-gray-400" : "bg-[#b28053]"
                            }`}
                        >
                            <Text className="text-white text-base font-semibold">
                                {success
                                    ? "Mot de passe modifié ✔"
                                    : verifyMutation.isPending
                                      ? "Vérification..."
                                      : "Valider"}
                            </Text>
                        </TouchableOpacity>
                    </FormProvider>
                )}

                {apiError && <Text className="text-red-500 text-center mt-3">{apiError}</Text>}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
