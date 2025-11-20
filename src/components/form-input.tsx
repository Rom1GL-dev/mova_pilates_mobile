import { Text, TextInput, View } from "react-native";

interface Props extends React.ComponentProps<typeof TextInput> {
    label: string;
    error?: string;
}

export function FormInput({ label, error, ...props }: Props) {
    return (
        <View className="mb-5">
            <Text className="font-semibold text-[15px] mb-1">{label}</Text>

            <TextInput
                {...props}
                className="bg-white border border-[#d8d8d8] rounded-xl px-4 py-3 text-[16px]"
                placeholderTextColor="#9a9a9a"
            />

            {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
        </View>
    );
}
