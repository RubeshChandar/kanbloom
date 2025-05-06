import { Button } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const nav = useNavigate()
    return (
        <form className="flex flex-col gap-7 min-w-64">
            <div className="text-2xl text-primary font-bold text-center uppercase">Register</div>

            <div className='flex flex-col gap-3'>
                <Button variant="contained" color="primary" type='submit'>
                    <HowToRegIcon className='mr-3' /> Register
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => nav("/login")}>
                    <ExitToAppIcon className='mr-3' /> Login as a existing User
                </Button>
            </div>
        </form>
    )
}

export default RegisterPage