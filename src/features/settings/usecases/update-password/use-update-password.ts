// use-update-password.ts
import { fetcher } from "@/libs/fetcher";
import { useMutation } from "@tanstack/react-query";
import { UpdatePasswordPayload } from "./update-password";

const BASE_URL = "/v1/profile";

export const updatePassword = async (data: UpdatePasswordPayload) => {
    return await fetcher.patch(`${BASE_URL}/update-password`, data);
};

export function useUpdatePassword() {
    return useMutation({
        mutationFn: (data: UpdatePasswordPayload) => updatePassword(data),
    });
}
