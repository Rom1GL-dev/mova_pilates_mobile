import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LayoutScreen } from "@/components/layout-screen";
import { Title } from "@/components/title";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useUpdatePassword } from "@/features/settings/usecases/update-password/use-update-password";
import {
    UpdatePasswordInput,
    updatePasswordSchema,
} from "@/features/settings/usecases/update-password/update-password";
import { SettingsPasswordField } from "@/features/settings/components/settings-password-field";
import { FullScreenLoader } from "@/components/loader";
import { useMe } from "@/providers/auth-provider";
import { ROUTES } from "@/config/routes.config";

export function ProfileSettingsUpdatePassword() {
    const user = useMe();
    const methods = useForm<UpdatePasswordInput>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const {
        handleSubmit,
        formState: { isSubmitting, errors },
        control,
        reset,
    } = methods;

    const mutation = useUpdatePassword();

    const onSubmit = (data: UpdatePasswordInput) => {
        mutation.mutate(
            {
                id: user.id,
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            },
            {
                onSuccess: () => {
                    reset();
                    setErrorMessage(null);
                    router.replace(ROUTES.profile.settings.index);
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || "Une erreur est survenue";
                    setErrorMessage(message);
                },
            },
        );
    };

    const isLoading = isSubmitting || mutation.isPending;

    return (
        <LayoutScreen noPadding>
            <View className="p-6 bg-white">
                <Title title="Modifier mon mot de passe" />
            </View>

            <View className="flex-1 bg-[#f7f3ef] p-4">
                <FormProvider {...methods}>
                    <View className="gap-4 mt-4">
                        <SettingsPasswordField
                            control={control}
                            name="currentPassword"
                            label="Mot de passe actuel"
                            error={errors.currentPassword?.message}
                        />

                        <SettingsPasswordField
                            control={control}
                            name="newPassword"
                            label="Nouveau mot de passe"
                            error={errors.newPassword?.message}
                        />

                        <SettingsPasswordField
                            control={control}
                            name="confirmPassword"
                            label="Confirmer le mot de passe"
                            error={errors.confirmPassword?.message}
                        />

                        <TouchableOpacity
                            disabled={isLoading}
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#b28053] py-4 rounded-2xl mt-2"
                        >
                            <Text className="text-center text-white text-lg font-semibold">
                                {isLoading ? "Enregistrement..." : "Enregistrer"}
                            </Text>
                        </TouchableOpacity>
                        {errorMessage && <Text className="text-red-500 text-center mt-2">{errorMessage}</Text>}
                    </View>
                </FormProvider>
            </View>

            {isLoading && <FullScreenLoader />}
        </LayoutScreen>
    );
}
