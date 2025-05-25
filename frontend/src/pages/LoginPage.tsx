import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Alert, AlertTitle, Button, IconButton, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import { TextInput } from '../styles/TextInput';
import { AuthToken, Login, LoginSchema } from '../types/AuthTypes';
import { SetTokens } from '../utils/TokenHandler';

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
                SetTokens(tokens)
                nav("/")
            })
            .catch(error => {
                if (axios.isAxiosError(error) && error.response) {

                    let message = "";

                    if (error.status === 401) {
                        message = "Invalid email or password. Please try again.";
                    } else if (error.status === 500) {
                        message = "Server error. Please try again later.";
                    } else if (error.response && error.response.data.detail) {
                        message = error.response.data.detail;
                    } else {
                        message = "An unexpected error occurred. Please try again.";
                    }

                    setError("root", { message: message, type: `Error code ${error.response.status}` })
                } else {
                    setError("root", { message: "An Server Error Occured" })
                }
            })

    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <form className="flex flex-col gap-7 min-w-88" onSubmit={handleSubmit(login)}>
            <div className="text-2xl font-bold text-center uppercase text-primary">Login</div>

            <TextInput fieldname='E-mail' {...register('email')} error={errors.email?.message} />
            <TextInput fieldname='Password' {...register('password')} error={errors.password?.message}
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