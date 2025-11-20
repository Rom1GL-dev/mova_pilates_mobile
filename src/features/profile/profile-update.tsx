import { LayoutScreen } from "@/components/layout-screen";
import { Title } from "@/components/title";
import { ProfileUpdateForm } from "@/features/profile/components/profile-update-form";
import { View } from "react-native";
import { FullScreenLoader } from "@/components/loader";
import React, { useState } from "react";

export function ProfileUpdate() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <LayoutScreen>
            <Title title={"Mon profil"} />
            <ProfileUpdateForm setIsLoading={setIsLoading} />
            {isLoading && (
                <View className="absolute inset-0">
                    <FullScreenLoader />
                </View>
            )}
        </LayoutScreen>
    );
}
