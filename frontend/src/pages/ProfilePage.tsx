import { Backdrop, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import api from "@src/api";
import ChangePassword from "@src/components/ChangePassword";
import EditProfilePic from "@src/components/EditProfilePic";
import { showSnackbar } from "@src/state/SnackBarSlice";
import { RootState } from "@src/state/store";
import { TextInput } from "@src/styles/TextInput";
import { EditProfile } from "@src/types/UserProfile";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
    const userProfile = useSelector((state: RootState) => state.currentUser.currentUser)
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm<EditProfile>()
    const dispatch = useDispatch()
    const [showChangePassword, setShowChangePassword] = useState(false)

    const updateProfileDetails = async (data: EditProfile) => {
        try {
            const res = await api.patch("user/update-profile/", {
                'profile_id': userProfile!.profile_id,
                ...data
            })
            dispatch(showSnackbar({ message: res.data['data'], severity: "success" }))
        } catch (error) {
            if (axios.isAxiosError(error) && error.status == 406) {
                setError("username", { message: 'Username is already taken' })
            }
            dispatch(showSnackbar({ message: "Error occured check console", severity: "error" }))
            console.log(error)
        }
    }

    useEffect(() => {
        if (userProfile) {
            reset({
                title: userProfile.title ?? "",
                username: userProfile.user.username ?? ""
            });
        }
    }, [userProfile, reset]);

    if (useSelector((state: RootState) => state.currentUser.isLoading)) {
        return <CircularProgress></CircularProgress>
    }

    return (
        <div className="bg-[#181A1B] flex flex-col gap items-center py-16 px-2">
            <Backdrop
                open={showChangePassword}
                sx={{
                    zIndex: (theme) => theme.zIndex.modal + 1,
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                }}
            >
                <ChangePassword setShowForm={setShowChangePassword} />
            </Backdrop>

            {/* Card Container */}
            <div className="bg-[#232526] rounded-3xl shadow-2xl max-w-xl w-full p-8 flex flex-col gap-5 items-center">
                <EditProfilePic userProfile={userProfile!} />

                {/* User Info Form */}
                <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit(updateProfileDetails)}>

                    <div className="w-full flex items-center bg-[#181A1B] border border-[#333] rounded-lg px-4 py-3">
                        <span className="mr-3 text-[#888] text-lg" title="Email">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                        <span className="text-[#CFFF04] font-semibold text-base break-all select-text">
                            {userProfile?.user.email}
                        </span>
                    </div>

                    <TextInput fieldname="Username" {...register('username')} error={errors.username?.message} />
                    <TextInput fieldname="Title / Role" {...register('title')} error={errors.title?.message} />

                    <div className="flex flex-col md:flex-row gap-4 mt-2 justify-between">
                        <Button variant="outlined" color="warning" fullWidth
                            onClick={() => setShowChangePassword(true)}>
                            Change Password
                        </Button>
                        <Button type="submit" variant="contained" color="success" fullWidth>
                            Save Changes
                        </Button>
                    </div>
                </form>

                {/* Created & Last Modified */}
                <div className="flex flex-col md:flex-row gap-2 justify-between w-full text-sm text-gray-500 mt-2 border-t pt-4">
                    <span>
                        Created: <span className="text-primary">
                            {dayjs(userProfile?.created_at).format("D MMM, YYYY @ h:mm A")}
                        </span>
                    </span>
                    <span>
                        Last updated: <span className="text-primary">
                            {dayjs(userProfile?.last_modified).format("D MMM, YYYY @ h:mm A")}
                        </span>
                    </span>
                </div>
            </div>
        </div >
    );
}

export default ProfilePage;