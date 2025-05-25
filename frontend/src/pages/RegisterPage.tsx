import { zodResolver } from '@hookform/resolvers/zod';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { showSnackbar } from '../state/SnackBarSlice';
import { TextInput } from '../styles/TextInput';
import { Register, RegisterSchema } from '../types/AuthTypes';
import { ClearTokens } from '../utils/TokenHandler';


const RegisterPage = () => {
    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors }
    } = useForm<Register>({
        resolver: zodResolver(RegisterSchema)
    })

    const dispatch = useDispatch()

    const RegisterUser: SubmitHandler<Register> = async (data) => {
        ClearTokens();
        api.post('user/register/', data)
            .then(res => {
                if (res.status == 201) {
                    // Navigate back to login.
                    nav("/login", {
                        replace: true, state: {
                            username: data.username
                        }
                    })

                    dispatch(showSnackbar({
                        message: 'Registration successfully done!',
                        severity: 'success',
                    }));
                }
            })
            .catch((error: AxiosError) => {
                const responseData = error.response?.data as { username?: string, email?: string };
                setError('username', { message: responseData.username })
                setError('email', { message: responseData.email })

            })
    }
    return (
        <form className="flex flex-col gap-7 min-w-88" onSubmit={handleSubmit(RegisterUser)}>
            <div className="text-2xl font-bold text-center uppercase text-primary">Register</div>

            <TextInput {...register("email")} fieldname='E-mail' error={errors.email?.message} />
            <TextInput {...register("username")} fieldname='Username' error={errors.username?.message} />

            <TextInput {...register("password")} fieldname='Password' error={errors.password?.message}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position='end'>
                        <IconButton onClick={() => setShowPassword((s) => !s)}
                            edge="end"
                            color='secondary'>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <TextInput {...register("confirmPassword")} fieldname='Confirm Password' type='password' error={errors.confirmPassword?.message} />

            <div className='flex flex-col gap-5'>
                <Button variant="contained" color="primary" type='submit'>
                    <HowToRegIcon className='mr-3' /> Register User
                </Button>
                <div className="text-center">OR</div>
                <Button variant="outlined" color="secondary" onClick={() => nav("/login")}>
                    <ExitToAppIcon className='mr-3' /> Login as a existing User
                </Button>
            </div>
        </form>
    )
}

export default RegisterPage
