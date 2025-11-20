import { Text, View } from "react-native";
import React from "react";
import { UserSession } from "@/providers/auth-provider";

interface Props {
    user: UserSession;
}

export function ProfileUserAvatar({ user }: Props) {
    return (
        <View className="min-h-32 bg-white relative justify-end z-10">
            <View className="absolute left-0 right-0 -bottom-14 items-center">
                <View className="w-28 h-28 rounded-full bg-[#b28053] items-center justify-center ">
                    <Text className="text-4xl text-white">
                        {user.firstname?.[0]}
                        {user.lastname?.[0]}
                    </Text>
                </View>
            </View>
        </View>
    );
}
