import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
    children: React.ReactNode;
    noPadding?: boolean;
}

export function LayoutScreen({ children, noPadding }: Props) {
    return <SafeAreaView className={`flex-1 bg-white ${!noPadding ? "p-6" : ""}`}>{children}</SafeAreaView>;
}
