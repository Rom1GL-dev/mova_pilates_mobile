import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as SecureStore from "expo-secure-store";
import { X } from "lucide-react-native";

import { ROUTES } from "@/config/routes.config";

import { RegisterSchema, registerSchema } from "@/features/register/types/register";
import { useRegister } from "@/features/register/api/use-register";
import { RegisterProgressBar } from "@/features/register/components/register-progress-bar";
import { RegisterStep3Consent } from "@/features/register/components/steps/register-step3-consent";
import { RegisterStep2Account } from "@/features/register/components/steps/register-step2-account";
import { RegisterStep1Personal } from "@/features/register/components/steps/register-step1-personal";

export function Register() {
    const router = useRouter();
    const registerMutation = useRegister();

    const [step, setStep] = useState(1);
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const methods = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            dob: "",
            tel: "",
            email: "",
            password: "",
            consent: false,
        },
    });

    const { handleSubmit, trigger } = methods;

    const next = async () => {
        let fields: (keyof RegisterSchema)[] = [];

        if (step === 1) fields = ["firstname", "lastname", "dob", "tel"];
        if (step === 2) fields = ["email", "password"];

        const valid = await trigger(fields);
        if (valid) setStep(step + 1);
    };

    const back = () => setStep(step - 1);

    const onSubmit = (data: RegisterSchema) => {
        setApiError(null);
        setSuccess(false);

        registerMutation.mutate(data, {
            onSuccess: async (data) => {
                setSuccess(true);
                await SecureStore.setItemAsync("sessionId", data.sessionId);
                router.replace(ROUTES.home.index as never);
            },
            onError: (err: any) => {
                setApiError(err?.message || "Une erreur est survenue");
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
                        <Text className="text-lg text-gray-600">Création de compte</Text>
                    </View>

                    <TouchableOpacity onPress={() => router.navigate(ROUTES.home.index as never)} className="h-10 w-10">
                        <X />
                    </TouchableOpacity>
                </View>

                <RegisterProgressBar step={step} />

                <FormProvider {...methods}>
                    {step === 1 && <RegisterStep1Personal />}
                    {step === 2 && <RegisterStep2Account />}
                    {step === 3 && <RegisterStep3Consent />}
                </FormProvider>

                <View className="mt-6">
                    <View className="flex flex-row gap-4 items-center w-full">
                        {step > 1 && (
                            <TouchableOpacity
                                onPress={back}
                                className="flex-1 rounded-2xl items-center py-4 bg-[#b28053]"
                            >
                                <Text className="text-white text-base font-semibold">Retour</Text>
                            </TouchableOpacity>
                        )}

                        {step < 3 && (
                            <TouchableOpacity
                                onPress={next}
                                className="flex-1 rounded-2xl items-center py-4 bg-[#b28053]"
                            >
                                <Text className="text-white text-base font-semibold">Continuer</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    {step === 3 && (
                        <TouchableOpacity
                            onPress={handleSubmit(onSubmit)}
                            disabled={registerMutation.isPending}
                            className={`w-full rounded-2xl items-center py-4 mt-4 ${
                                registerMutation.isPending ? "bg-gray-400" : "bg-[#b28053]"
                            }`}
                        >
                            <Text className="text-white text-base font-semibold">
                                {registerMutation.isPending ? "Création..." : "Créer mon compte"}
                            </Text>
                        </TouchableOpacity>
                    )}

                    {apiError && <Text className="text-red-500 text-center mt-3">{apiError}</Text>}
                </View>

                <TouchableOpacity
                    className="flex-row justify-center mt-6"
                    onPress={() => router.navigate(ROUTES.login.index as never)}
                >
                    <Text className="text-gray-600">Déjà un compte ? </Text>
                    <Text className="text-[#b28053] font-semibold">Se connecter</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
