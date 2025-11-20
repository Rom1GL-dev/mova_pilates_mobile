import { fetcher } from "@/libs/fetcher";
import { useMutation } from "@tanstack/react-query";

export type ForgotPasswordVerifyPayload = {
    email: string;
    otp: string;
    newPassword: string;
};

export const forgotPasswordVerify = async (data: ForgotPasswordVerifyPayload) => {
    return await fetcher.post("/v1/auth/forgot-password/verify", data);
};

export function useForgetPasswordVerify() {
    return useMutation({
        mutationFn: (data: ForgotPasswordVerifyPayload) => forgotPasswordVerify(data),
    });
}
