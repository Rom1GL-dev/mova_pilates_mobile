import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import React from "react";

interface Props {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    color?: string;
    rightElement?: React.ReactNode;
}

export function ProfileRowItem({ icon, label, onPress, color, rightElement }: Props) {
    const isPressable = typeof onPress === "function";

    return (
        <TouchableOpacity
            activeOpacity={isPressable ? 0.55 : 1}
            onPress={onPress}
            disabled={!isPressable}
            className="flex-row items-center justify-between bg-white rounded-2xl py-4 px-5 shadow-sm shadow-black/5"
        >
            {/* Left side */}
            <View className="flex-row items-center space-x-4">
                <View className="w-11 h-11 rounded-full bg-[#f5e8dd] items-center justify-center">{icon}</View>

                <Text className={`text-base font-medium pl-5 ${color ?? "text-[#333333]"}`}>{label}</Text>
            </View>

            <View>{rightElement ? rightElement : <ChevronRight size={18} color="#8c8c8c" />}</View>
        </TouchableOpacity>
    );
}
