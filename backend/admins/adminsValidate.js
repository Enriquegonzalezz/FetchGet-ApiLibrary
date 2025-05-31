import { z } from "zod";

const loginSchema = z.object({
    email: z.string().max(30),
    password: z.string().max(30),
});

export function validateLogin(input) {
    return loginSchema.safeParse(input);
}