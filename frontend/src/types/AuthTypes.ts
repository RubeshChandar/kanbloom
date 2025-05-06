import { z } from 'zod';

export const LoginSchema = z.object({
    username: z.string({ required_error: 'Username is required' }).min(4, "Name must have more than 3 characters"),
    password: z.string({ required_error: 'Password is required' }).min(8, "Passwords must be atleast 8 characters ")
})


export type Login = z.infer<typeof LoginSchema>