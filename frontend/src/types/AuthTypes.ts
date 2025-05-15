import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }).min(8, "Passwords must be atleast 8 characters ")
})


export type Login = z.infer<typeof LoginSchema>

export const RegisterSchema = LoginSchema.extend({
    username: z.string({ required_error: 'Username is required' }).min(4, "Name must have more than 3 characters"),
    confirmPassword: z.string({ required_error: 'Type your password again' })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't have match",
    path: ['confirmPassword']
})

export type Register = z.infer<typeof RegisterSchema>

export type AuthToken = {
    access: string,
    refresh?: string,
}


export type DecodedJWT = {
    exp: number;
    iat: number;
    jti: string;
    token_type: "access" | "refresh";
    user_id: string;
};