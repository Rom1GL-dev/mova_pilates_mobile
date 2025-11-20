import { z } from "zod";

export const registerSchema = z.object({
    firstname: z.string().nonempty("Prénom requis"),
    lastname: z.string().nonempty("Nom requis"),
    tel: z.string().nonempty("Numéro de téléphone requis"),
    dob: z.date(),
    email: z.string().email("Email invalide").nonempty("Email requis"),
    password: z.string().nonempty("Mot de passe requis").min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export const registerResponseSchema = z.object({
    sessionId: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
