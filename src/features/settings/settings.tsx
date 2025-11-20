import { LayoutScreen } from "@/components/layout-screen";
import { Title } from "@/components/title";
import { Alert, Switch, View } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { Bell, Lock, Mail, Trash2 } from "lucide-react-native";
import { ProfileRowItem } from "@/features/profile/components/profile-row-item";
import { ROUTES } from "@/config/routes.config";

export function Settings() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const handleDeleteAccount = () => {
        Alert.alert(
            "Supprimer mon compte",
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
            [
                { text: "Annuler", style: "cancel" },
                {
                    text: "Supprimer",
                    style: "destructive",
                    onPress: () => {
                        console.log("Compte supprimé");
                    },
                },
            ],
        );
    };

    return (
        <LayoutScreen noPadding>
            <View className="p-6 bg-white">
                <Title title="Paramètres" />
            </View>

            <View className="flex-1 bg-[#f7f3ef] p-4">
                <View className="gap-3">
                    <ProfileRowItem
                        icon={<Bell size={20} color="#b28053" />}
                        label="Notifications"
                        rightElement={
                            <Switch
                                value={notificationsEnabled}
                                onValueChange={setNotificationsEnabled}
                                trackColor={{ false: "#d6d6d6", true: "#b28053" }}
                                thumbColor="#fff"
                            />
                        }
                    />
                    <ProfileRowItem
                        icon={<Mail size={20} color="#b28053" />}
                        label="Modifier mon email"
                        onPress={() => router.push(ROUTES.profile.settings.updateEmail.index)}
                    />

                    <ProfileRowItem
                        icon={<Lock size={20} color="#b28053" />}
                        label="Modifier mon mot de passe"
                        onPress={() => router.push(ROUTES.profile.settings.updatePassword.index)}
                    />

                    <ProfileRowItem
                        icon={<Trash2 size={20} color="#E35D5D" />}
                        label="Supprimer mon compte"
                        color="text-[#E35D5D] font-semibold"
                        onPress={handleDeleteAccount}
                    />
                </View>
            </View>
        </LayoutScreen>
    );
}
