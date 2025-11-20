import { z } from "zod";

export const registerSchema = z.object({
    firstname: z.string().min(1, "Prénom requis"),
    lastname: z.string().min(1, "Nom requis"),
    dob: z.string().min(1, "Date requise"),
    tel: z.string().min(6, "Numéro invalide"),
    email: z.string().email("Email invalide"),
    password: z.string().min(6, "Mot de passe trop court"),
    consent: z.boolean().refine((v) => v === true, {
        message: "Vous devez accepter pour continuer",
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerResponseSchema = z.object({
    sessionId: z.string(),
});
