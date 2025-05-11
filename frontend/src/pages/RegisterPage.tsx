import { Button, IconButton, InputAdornment } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';
import { Register, RegisterSchema } from '../types/AuthTypes';
import { AuthInput } from '../components/AuthInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../state/SnackBarSlice';


const RegisterPage = () => {
    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<Register>({
        resolver: zodResolver(RegisterSchema)
    })

    const dispatch = useDispatch()

    const RegisterUser: SubmitHandler<Register> = async (data) => {

        console.log(data)
        // Navigate back to login.
        nav("/login", { replace: true })

        dispatch(showSnackbar({
            message: 'Registration successfully done!',
            severity: 'success',
        }));
    }

    return (
        <form className="flex flex-col gap-7 min-w-88" onSubmit={handleSubmit(RegisterUser)}>
            <div className="text-2xl text-primary font-bold text-center uppercase">Register</div>

            <AuthInput {...register("email")} fieldname='E-mail' error={errors.email?.message} />
            <AuthInput {...register("username")} fieldname='Username' error={errors.username?.message} />

            <AuthInput {...register("password")} fieldname='Password' error={errors.password?.message}
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
            <AuthInput {...register("confirmPassword")} fieldname='Confirm Password' type='password' error={errors.confirmPassword?.message} />

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
