import { fetcher } from "@/libs/fetcher";
import { useMutation } from "@tanstack/react-query";
import { UpdateProfileInput } from "./update-profile";
import type { UserSession } from "@/providers/auth-provider";

const BASE_URL = "/v1/profile";

type UpdateProfileResponse = {
    user: UserSession;
};

export const updateProfile = async (data: UpdateProfileInput): Promise<UserSession> => {
    const res = await fetcher.patch<UpdateProfileResponse>(`${BASE_URL}/update`, data);
    return res.user;
};

export function useUpdateProfile() {
    return useMutation({
        mutationFn: (data: UpdateProfileInput) => updateProfile(data),
    });
}
