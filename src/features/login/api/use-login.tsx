import { fetcher } from "@/libs/fetcher";
import { loginResponseSchema, LoginSchema } from "@/features/login/types/login";
import { useMutation } from "@tanstack/react-query";

const BASE_URL = "/v1/auth";

export const login = async (data: LoginSchema) => {
    const res = await fetcher.post(`${BASE_URL}/login`, data);
    return loginResponseSchema.parse(res);
};

export function useLogin() {
    return useMutation({
        mutationFn: (data: LoginSchema) => login(data),
    });
}
