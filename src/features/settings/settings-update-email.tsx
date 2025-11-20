// src/features/settings/settings-update-email.tsx
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LayoutScreen } from "@/components/layout-screen";
import { Title } from "@/components/title";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateEmail } from "@/features/settings/usecases/update-email/use-update-email";
import {
    UpdateEmailFormInput,
    UpdateEmailPayload,
    updateEmailSchema,
} from "@/features/settings/usecases/update-email/update-email";
import { SettingsPasswordField } from "@/features/settings/components/settings-password-field";
import { FullScreenLoader } from "@/components/loader";
import { useAuth, useMe } from "@/providers/auth-provider";
import { FormInput } from "@/components/form-input";

export function ProfileSettingsUpdateEmail() {
    const user = useMe();
    const { logout } = useAuth();

    const methods = useForm<UpdateEmailFormInput>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            newEmail: "",
            currentPassword: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        control,
        reset,
    } = methods;

    const [serverError, setServerError] = React.useState<string | null>(null);

    const mutation = useUpdateEmail();

    const onSubmit = (data: UpdateEmailFormInput) => {
        setServerError(null);

        const payload: UpdateEmailPayload = {
            id: user.id,
            newEmail: data.newEmail,
            currentPassword: data.currentPassword,
        };

        mutation.mutate(payload, {
            onSuccess: async () => {
                reset();
                await logout();
            },
            onError: (err: any) => {
                const msg =
                    err?.message ||
                    err?.response?.data?.message ||
                    "Une erreur est survenue lors de la mise à jour de l’email.";
                setServerError(msg);
                console.log("ERROR UPDATE EMAIL", err);
            },
        });
    };

    const isLoading = isSubmitting || mutation.isPending;

    return (
        <LayoutScreen noPadding>
            <View className="p-6 bg-white">
                <Title title="Modifier mon email" />
            </View>

            <View className="flex-1 bg-[#f7f3ef] p-4">
                <FormProvider {...methods}>
                    <View className="gap-4 mt-4">
                        <Controller
                            control={control}
                            name="newEmail"
                            render={({ field: { onChange, value } }) => (
                                <FormInput
                                    label="Nouvelle adresse email"
                                    value={value}
                                    onChangeText={onChange}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="exemple@domaine.fr"
                                    error={errors.newEmail?.message}
                                />
                            )}
                        />

                        <SettingsPasswordField
                            control={control}
                            name="currentPassword"
                            label="Mot de passe actuel"
                            error={errors.currentPassword?.message}
                        />

                        {serverError && <Text className="text-red-500 text-center mt-1">{serverError}</Text>}

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#b28053] py-4 rounded-2xl mt-2"
                        >
                            <Text className="text-center text-white text-lg font-semibold">
                                {isLoading ? "Enregistrement..." : "Enregistrer"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </FormProvider>
            </View>

            {isLoading && <FullScreenLoader />}
        </LayoutScreen>
    );
}
