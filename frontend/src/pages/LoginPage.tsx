import { Alert, AlertTitle, Button, IconButton, InputAdornment } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login, LoginSchema } from '../types/AuthTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthInput } from '../components/AuthInput';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import api from '../api';
import { AuthToken } from '../types/AuthTypes';
import axios from 'axios';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../types/Constants';

const LoginPage = () => {
    const location = useLocation();
    const successUsername = location.state?.username || '';

    const nav = useNavigate();

    const {
        handleSubmit,
        setError,
        register,
        formState: { isSubmitting, errors }
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema)
    })

    const login: SubmitHandler<Login> = async (data) => {

        await api.post("user/token/", data)
            .then(res => {
                const tokens = res.data as AuthToken
                localStorage.setItem(ACCESS_TOKEN, tokens.access)
                localStorage.setItem(REFRESH_TOKEN, tokens.refresh!)
                nav("/")
            })
            .catch(error => {
                if (axios.isAxiosError(error) && error.response) {
                    const message = error.response.data.detail || "An Error Occured"
                    setError("root", { message: message, type: `Error code ${error.response.status}` })
                } else {
                    setError("root", { message: "An Server Error Occured" })
                }
            })

    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <form className="flex flex-col gap-7 min-w-88" onSubmit={handleSubmit(login)}>
            <div className="text-2xl text-primary font-bold text-center uppercase">Login</div>

            <AuthInput fieldname='E-mail' {...register('email')} error={errors.email?.message} />
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
            {
                successUsername &&
                <Alert variant="filled" severity="success">
                    Use {successUsername}'s credentials to login!!!
                </Alert>
            }
            {
                errors.root &&
                <Alert variant="filled" severity="error">
                    <AlertTitle>{errors.root.type}</AlertTitle>
                    {errors.root.message}
                </Alert>
            }
        </form>
    )
}

export default LoginPage