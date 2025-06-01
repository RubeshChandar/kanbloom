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

export const ChangePasswordSchema = z.object({
    currentPassword: z.string({ required_error: 'Type your current password' }),
    newPassword: z.string({ required_error: 'New password is required' }).min(8, "Passwords must be atleast 8 characters "),
    confirmNewPassword: z.string({ required_error: 'Type your password again' })
})
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: "You typed the same for your old and new passwords",
        path: ['newPassword']
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "New and Confirm Password fields don't have match",
        path: ['confirmNewPassword']
    })

export type ChangePassword = z.infer<typeof ChangePasswordSchema>