import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@mui/material';
import Button from '@mui/material/Button';
import api from '@src/api';
import { showSnackbar } from '@src/state/SnackBarSlice';
import { glassyCard } from '@src/styles/CustomStyleMUI';
import PwdSwitch from '@src/styles/PwdSwitch';
import { TextInput } from '@src/styles/TextInput';
import { ChangePasswordSchema, ChangePassword as ChangePasswordType } from '@src/types/AuthTypes';
import { logout } from '@src/utils/TokenHandler';
import axios from 'axios';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const ChangePassword = ({ setShowForm }: { setShowForm: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const nav = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const {
        register,
        handleSubmit, setError,
        formState: { errors, isLoading } } = useForm<ChangePasswordType>({ resolver: zodResolver(ChangePasswordSchema) })
    const dispatch = useDispatch()
    const changePasswordHandler = async (data: ChangePasswordType) => {
        try {
            const res = await api.post("user/change-password/", data)
            dispatch(showSnackbar({ message: res.data['data'] + " Please login again", severity: "success" }))
            logout(nav, dispatch)
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.status == 400) {
                dispatch(showSnackbar({ message: error.response?.data['error'], severity: "error" }))
                setError('currentPassword', { message: error.response?.data['error'] })
            } else {
                dispatch(showSnackbar({ message: "some error occured! check console", severity: "error" }))
                console.log(error)
            }
        }
    };

    return (
        <Card sx={{ ...glassyCard, width: '35%' }}>
            <form onSubmit={handleSubmit(changePasswordHandler)} className='flex flex-col gap-7'>
                <h2 className="text-neon font-extrabold text-2xl tracking-wide border-b-4 border-neon text-shadow-neon text-center pb-3">
                    Change Password
                </h2>

                <TextInput fieldname='Current Password' {...register("currentPassword")}
                    type={showPassword ? 'text' : 'password'} error={errors.currentPassword?.message} />
                <TextInput fieldname='New Password' {...register("newPassword")}
                    type={showPassword ? 'text' : 'password'} error={errors.newPassword?.message} />
                <TextInput fieldname='Confirm New Password' {...register("confirmNewPassword")}
                    type={showPassword ? 'text' : 'password'} error={errors.confirmNewPassword?.message} />
                <PwdSwitch checked={showPassword} setShowPassword={setShowPassword}></PwdSwitch>

                <div className='flex flex-row gap-2'>
                    <Button variant="outlined" color="error" onClick={() => setShowForm(false)} fullWidth>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="success" fullWidth loading={isLoading}>
                        Change Password
                    </Button>
                </div>
            </form>
        </Card >
    )
}

export default ChangePassword