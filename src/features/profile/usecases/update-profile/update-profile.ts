import { z } from "zod";

export const updateProfileSchema = z.object({
    id: z.string(),
    firstname: z.string().min(2, "Prénom trop court"),
    lastname: z.string().min(2, "Nom trop court"),
    tel: z.string().optional(),
    dob: z.union([z.string(), z.date()]).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
