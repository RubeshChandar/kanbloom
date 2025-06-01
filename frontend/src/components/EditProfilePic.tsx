import { IconButton, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import api from "@src/api";
import { showSnackbar } from "@src/state/SnackBarSlice";
import { MenuStyle } from "@src/styles/CustomStyleMUI";
import { UserProfile } from "@src/types/UserProfile";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";


const EditProfilePic = ({ userProfile }: { userProfile: UserProfile }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRemoveImage = async () => {
        if (!userProfile.imageURL) {
            dispatch(showSnackbar({ message: "There is no Image to be removed", severity: "info" }))
            handleMenuClose();
            return
        }

        // Placeholder function for removing image
        try {
            const res = await api.delete("user/update-profile/", {
                data: { 'profile_id': userProfile.profile_id, }
            })
            dispatch(showSnackbar({ message: res.data['data'], severity: "success" }))
            window.location.reload();
        } catch (error) {
            if (axios.isAxiosError(error) && error.status == 404) {
                dispatch(showSnackbar({ message: error.response?.data['error'], severity: "warning" }))
            }
            console.log(error)
        }

        handleMenuClose();
    };

    const handleUploadClick = () => {
        inputRef.current?.click();
    };

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append("profile_id", userProfile.profile_id);
            formData.append("image_file", event.target.files[0]);

            api.post("user/update-profile/", formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                dispatch(showSnackbar({ message: res.data['data'], severity: "success" }))
                window.location.reload();
            })

            handleMenuClose();
        }
    };

    return (
        <div className="relative mb-6">

            <Avatar
                src={userProfile.imageURL ?? ""} // Replace with user.image
                sx={{ width: 120, height: 120, fontSize: "2.5rem", border: "4px solid green", }}
            />

            <IconButton
                color="primary"
                className="!absolute !bottom-2 !right-2"
                sx={{
                    zIndex: 20,
                    width: 40,
                    height: 40,
                    bgcolor: "#232526",
                    color: "#CFFF04",
                    "&:hover": { bgcolor: "#CFFF04", color: "#181A1B" },
                }}
                onClick={handleMenuOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3h-1.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H8a2 2 0 00-2 2v1h12V7a2 2 0 00-2-2z" />
                </svg>
            </IconButton>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
            />
            <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                className="mt-7"
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={MenuStyle}
            >
                <MenuItem onClick={handleUploadClick} sx={{ color: "#fff" }}>
                    Upload Image
                </MenuItem>
                <MenuItem onClick={handleRemoveImage} sx={{ color: "#fff" }}>
                    Remove Image
                </MenuItem>
            </Menu>
        </div>
    )
}

export default EditProfilePic