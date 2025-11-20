import { Text, TouchableOpacity, View } from "react-native";
import { ChevronLeft } from "lucide-react-native";
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
        <View className="flex flex-row items-center gap-4">
            {!noGoBack && (
                <TouchableOpacity onPress={goBack}>
                    <ChevronLeft size={24} />
                </TouchableOpacity>
            )}
            <Text className="text-4xl font-medium">{title}</Text>
        </View>
    );
}
