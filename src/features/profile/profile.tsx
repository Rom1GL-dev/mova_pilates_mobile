import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { LayoutScreen } from "@/components/layout-screen";
import { useMe } from "@/providers/auth-provider";
import { FullScreenLoader } from "@/components/loader";
import { ProfileUserAvatar } from "@/features/profile/components/profile-user-avatar";
import { ProfileRows } from "@/features/profile/components/profile-rows";

export function Profile() {
    const user = useMe();

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LayoutScreen noPadding>
            <View className="flex-1">
                <ScrollView className="flex-1">
                    <ProfileUserAvatar user={user} />
                    <ProfileRows user={user} setIsLoading={setIsLoading} />
                </ScrollView>

                {isLoading && (
                    <View className="absolute inset-0">
                        <FullScreenLoader />
                    </View>
                )}
            </View>
        </LayoutScreen>
    );
}
