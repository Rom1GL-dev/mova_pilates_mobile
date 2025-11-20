import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalide").nonempty("Email requis"),
    password: z.string().nonempty("Mot de passe requis"),
});

export const loginResponseSchema = z.object({
    sessionId: z.string(),
    account: z.object({
        id: z.string(),
        user: z.object({
            email: z.string(),
            firstname: z.string(),
            lastname: z.string(),
            role: z.enum(["ADMIN", "USER"]),
        }),
    }),
});

export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
