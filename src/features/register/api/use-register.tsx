import { fetcher } from "@/libs/fetcher";
import { useMutation } from "@tanstack/react-query";
import { registerResponseSchema, RegisterSchema } from "@/features/register/types/register";

const BASE_URL = "/v1/auth";

export const register = async (data: RegisterSchema) => {
    const res = await fetcher.post(`${BASE_URL}/register`, data);
    return registerResponseSchema.parse(res);
};

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterSchema) => register(data),
    });
}
