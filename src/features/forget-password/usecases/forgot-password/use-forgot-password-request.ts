import { fetcher } from "@/libs/fetcher";
import { useMutation } from "@tanstack/react-query";

export type ForgotPasswordRequestPayload = {
    email: string;
};

export const forgotPasswordRequest = async (data: ForgotPasswordRequestPayload) => {
    return await fetcher.post("/v1/auth/forgot-password/request", data);
};

export function useForgetPasswordRequest() {
    return useMutation({
        mutationFn: (data: ForgotPasswordRequestPayload) => forgotPasswordRequest(data),
    });
}
