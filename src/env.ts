import { z } from "zod";

const EnvSchema = z.object({
    API_URL: z.string(),
    VERSION: z.string().optional(),
});

export const env = EnvSchema.parse({
    API_URL: process.env.EXPO_PUBLIC_API_URL,
    VERSION: process.env.EXPO_PUBLIC_VERSION,
});
