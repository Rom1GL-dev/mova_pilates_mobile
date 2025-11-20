import { z } from "zod";

export const updateEmailSchema = z.object({
    newEmail: z.string().email("Adresse email invalide"),
    currentPassword: z.string().min(6, "Mot de passe requis"),
});

export type UpdateEmailFormInput = z.infer<typeof updateEmailSchema>;

export type UpdateEmailPayload = {
    id: string;
    newEmail: string;
    currentPassword: string;
};
