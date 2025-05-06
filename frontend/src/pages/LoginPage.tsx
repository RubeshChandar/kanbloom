import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { StyledInput } from '../components/StyledInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Login, LoginSchema } from '../types/AuthTypes';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const nav = useNavigate()

    const {
        control,
        handleSubmit,
        setError,
        formState: { isSubmitting }
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema)
    })

    const login: SubmitHandler<Login> = async (data) => {
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setError("username", { message: "Already Taken" })
    }


    return (
        <form className="flex flex-col gap-7 min-w-64" onSubmit={handleSubmit(login)}>
            <div className="text-2xl text-primary font-bold text-center uppercase">Login</div>
            <StyledInput fieldname='username' control={control} />
            <StyledInput fieldname='password' control={control} type={'password'} />
            <div className='flex flex-col gap-3'>
                <Button variant="contained" color="primary" type='submit' loading={isSubmitting}>
                    <LoginIcon className='mr-3' /> Login
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => nav("/register")}>
                    <PersonAddIcon className='mr-3' />  Register as a new user
                </Button>
            </div>
        </form>
    )
}

export default LoginPage