import { z } from "zod";

export const forgotPasswordEmailSchema = z.object({
    email: z.string().email("Email invalide"),
});
export type ForgotPasswordEmailSchema = z.infer<typeof forgotPasswordEmailSchema>;

export const forgotPasswordVerifySchema = z.object({
    otp: z.string().min(6, "Code OTP requis"),
    newPassword: z.string().min(6, "Le mot de passe doit faire au moins 6 caractères"),
});
export type ForgotPasswordVerifySchema = z.infer<typeof forgotPasswordVerifySchema>;
