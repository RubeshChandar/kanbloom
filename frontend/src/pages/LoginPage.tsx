import { Button, IconButton, InputAdornment } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login, LoginSchema } from '../types/AuthTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/AuthInput';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const LoginPage = () => {

    const nav = useNavigate()

    const {
        handleSubmit,
        setError,
        register,
        formState: { isSubmitting, errors }
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema)
    })

    const login: SubmitHandler<Login> = async (data) => {
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setError("username", { message: "Already Taken" })
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <form className="flex flex-col gap-7 min-w-88" onSubmit={handleSubmit(login)}>
            <div className="text-2xl text-primary font-bold text-center uppercase">Login</div>

            <AuthInput fieldname='Username' {...register('username')} error={errors.username?.message} />
            <AuthInput fieldname='Password' {...register('password')} error={errors.password?.message}
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                            color='secondary'
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                } />

            <div className='flex flex-col gap-5 mt-5'>
                <Button variant="contained" color="primary" type='submit' loading={isSubmitting}>
                    <LoginIcon className='mr-3' /> Login
                </Button>
                <div className="text-center">OR</div>
                <Button variant="outlined" color="secondary" onClick={() => nav("/register")}>
                    <PersonAddIcon className='mr-3' />  Register as a new user
                </Button>
            </div>
        </form>
    )
}

export default LoginPage