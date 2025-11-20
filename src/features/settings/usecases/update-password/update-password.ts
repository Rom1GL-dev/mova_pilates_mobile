// update-password.ts
import { z } from "zod";

export const updatePasswordSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z.string().min(6, "Le nouveau mot de passe doit faire 6 caractères minimum"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Les mots de passe ne correspondent pas",
        path: ["confirmPassword"],
    });

export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;

export type UpdatePasswordPayload = {
    id: string;
    currentPassword: string;
    newPassword: string;
};
