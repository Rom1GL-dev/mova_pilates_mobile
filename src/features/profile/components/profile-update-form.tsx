import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth, useMe } from "@/providers/auth-provider";
import { FormFields } from "@/features/profile/components/profile-update-form-fields";
import { UpdateProfileInput, updateProfileSchema } from "@/features/profile/usecases/update-profile/update-profile";
import { useUpdateProfile } from "@/features/profile/usecases/update-profile/use-update-profile";
import { ROUTES } from "@/config/routes.config";
import { router } from "expo-router";

interface Props {
    setIsLoading?: (loading: boolean) => void;
}

export function ProfileUpdateForm({ setIsLoading }: Props) {
    const user = useMe();
    const updateProfileMutation = useUpdateProfile();
    const { setUser } = useAuth();

    const methods = useForm<UpdateProfileInput>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            tel: user.tel ?? "",
            dob: user.dob ?? "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = (data: UpdateProfileInput) => {
        setIsLoading?.(true);

        updateProfileMutation.mutate(data, {
            onSuccess: (updatedUser) => {
                setIsLoading?.(false);
                setUser(updatedUser);
                router.replace(ROUTES.profile.index as never);
            },
            onError: (err) => {
                setIsLoading?.(false);
            },
        });
    };

    return (
        <FormProvider {...methods}>
            <View className="mt-6">
                <FormFields />

                <TouchableOpacity
                    disabled={isSubmitting}
                    onPress={handleSubmit(onSubmit)}
                    className="bg-[#b28053] py-4 rounded-2xl mt-4"
                >
                    <Text className="text-center text-white text-lg font-semibold">
                        {isSubmitting ? "Enregistrement..." : "Enregistrer"}
                    </Text>
                </TouchableOpacity>
            </View>
        </FormProvider>
    );
}
