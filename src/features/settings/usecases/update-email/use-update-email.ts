import { useMutation } from "@tanstack/react-query";
import { fetcher } from "@/libs/fetcher";
import { UpdateEmailPayload } from "./update-email";

export type UpdateEmailResponse = {
    user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        tel: string;
        dob: string | Date;
        role: string;
    };
};

const BASE_URL = "/v1/profile";

export const updateEmail = async (data: UpdateEmailPayload): Promise<UpdateEmailResponse> => {
    return await fetcher.patch<UpdateEmailResponse>(`${BASE_URL}/update-email`, data);
};

export function useUpdateEmail() {
    return useMutation({
        mutationFn: (data: UpdateEmailPayload) => updateEmail(data),
    });
}
