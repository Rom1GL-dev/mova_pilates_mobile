import { useAuth, UserSession } from "@/providers/auth-provider";
import { Text, View } from "react-native";
import { ProfileRowItem } from "@/features/profile/components/profile-row-item";
import { LogOut, Settings, User } from "lucide-react-native";
import { router } from "expo-router";
import { ROUTES } from "@/config/routes.config";
import { appConfig } from "@/config/app.config";
import React from "react";

interface Props {
    user: UserSession;
    setIsLoading?: (loading: boolean) => void;
}

export function ProfileRows({ user, setIsLoading }: Props) {
    const { logout } = useAuth();

    const handleLogout = async () => {
        setIsLoading?.(true);
        await logout();
    };

    return (
        <View className="pt-12 bg-[#f7f3ef] h-full">
            <Text className="mt-4 text-3xl font-semibold text-center">
                {user.firstname} {user.lastname}
            </Text>

            <View className="mt-3 self-center px-4 py-1.5 bg-[#b28053]/15 rounded-full">
                <Text className="text-[#b28053] font-medium">{user.email}</Text>
            </View>

            <View className="mt-10 gap-3 mx-6">
                <ProfileRowItem
                    icon={<User size={20} color="#b28053" />}
                    label="Modifier mon profil"
                    onPress={() => router.replace(ROUTES.profile.update.index)}
                />

                <ProfileRowItem
                    icon={<Settings size={20} color="#b28053" />}
                    label="Paramètres"
                    onPress={() => router.replace(ROUTES.profile.settings.index)}
                />

                <ProfileRowItem
                    icon={<LogOut size={20} color="#E35D5D" />}
                    label="Déconnexion"
                    color="text-[#E35D5D] !font-bold"
                    onPress={handleLogout}
                />
            </View>

            <Text className="mt-5 text-center underline">v{appConfig.version}</Text>
        </View>
    );
}
