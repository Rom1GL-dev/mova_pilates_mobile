import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { usePathname, useRouter } from "expo-router";
import { ROUTES } from "@/config/routes.config";

interface Props {
    title: string;
    noGoBack?: boolean;
}

export function Title({ title, noGoBack }: Props) {
    const router = useRouter();
    const pathname = usePathname();

    const goBack = () => {
        if (pathname.startsWith("/profile/")) {
            router.replace(ROUTES.profile.index);
        } else {
            router.back();
        }
    };

    return (
        <View className="flex-row items-center justify-between w-full">
            <View className="w-10">
                {!noGoBack && (
                    <TouchableOpacity onPress={goBack}>
                        <ArrowLeft size={24} />
                    </TouchableOpacity>
                )}
            </View>

            <View className="flex-1 items-center">
                <Text className="text-xl font-medium" numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
            </View>

            <View className="w-10" />
        </View>
    );
}
