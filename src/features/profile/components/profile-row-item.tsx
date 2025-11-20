import { Text, TouchableOpacity, View } from "react-native";
import { ChevronRight } from "lucide-react-native";

interface Props {
    icon: React.ReactNode;
    label: string;
    onPress?: () => void;
    color?: string;
}

export function ProfileRowItem({ icon, label, onPress, color }: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.55}
            onPress={onPress}
            className="flex-row items-center justify-between bg-white rounded-2xl py-4 px-5 shadow-sm shadow-black/5"
        >
            <View className="flex-row items-center space-x-4">
                <View className="w-11 h-11 rounded-full bg-[#f5e8dd] items-center justify-center">{icon}</View>
                <Text className={`text-base font-medium pl-5 ${color ? color : "text-[#333333]"}`}>{label}</Text>
            </View>
            <ChevronRight size={18} />
        </TouchableOpacity>
    );
}
