import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt1';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Divider, IconButton, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Paper, TextField, Typography } from "@mui/material";
import api from '@src/api';
import { RootState } from '@src/state/store';
import { dividerSx, memberListItemSx, memberRemoveButtonSx, paperSx, searchInputSx, searchResultAddButtonSx, searchResultListItemSx, titleSx } from '@src/styles/ManageBoardMembersStyle';
import theme from '@src/styles/MaterialTheme';
import { ShortendUser } from '@src/types/UserProfile';
import { handleBoardMembers } from '@src/utils/TasksHelper';
import React, { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ManageBoardType = {
    slug: string,
    closeForm: React.Dispatch<SetStateAction<boolean>>,
    owner: ShortendUser,
}
const ManageBoardMembers = ({ slug, closeForm, owner }: ManageBoardType) => {
    const currentMembers = useSelector((state: RootState) => state.boardMembers)
    const [searchUser, setSearchUser] = useState("")
    const [searchResults, setSearchResults] = useState<ShortendUser[]>([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!searchUser) {
            setSearchResults([])
            return
        }; // optional: skip when input is empty

        const delay = setTimeout(() => {
            api
                .get(`user/${slug}/handle-users/`, {
                    params: { "search_term": searchUser }
                })
                .then(res => {
                    setSearchResults(res.data)
                })
        }, 350); // 350ms debounce

        return () => clearTimeout(delay);
    }, [slug, searchUser])

    return (
        <Paper elevation={10} sx={paperSx} className='custom-scroll-bar'>
            <Typography variant="h5" fontWeight={800} textAlign="center" sx={titleSx}  >
                Manage Board Members
            </Typography>

            <TextField fullWidth variant="outlined" size="medium" placeholder="Search for users..."
                value={searchUser} onChange={(e) => setSearchUser(e.target.value)}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: theme.palette.custom.neon }} />
                            </InputAdornment>
                        ),
                        sx: searchInputSx
                    }
                }}
            />

            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 1, mt: 2 }}>
                Current Members
            </Typography>
            <List dense>
                <ListItem key={owner.id} sx={memberListItemSx}
                    secondaryAction={
                        <IconButton edge="end" aria-label="remove" sx={{ ...memberRemoveButtonSx, border: "1.5px solid grey" }} disabled>
                            <PersonOffIcon />
                        </IconButton>
                    }
                >
                    <ListItemAvatar>
                        <Avatar src={owner.imageURL} sx={{ bgcolor: theme.palette.primary.main }}>
                            {owner.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <div className="flex items-center gap-2">
                                <span>{owner.name}</span>
                                <span className="text-xs px-2 bg-neon text-[#232526] font-bold rounded-full ml-1">Owner</span>
                            </div>
                        }
                        secondary={owner.title}
                    />
                </ListItem>
                {
                    currentMembers.map(member => {
                        if (member.id === owner.id) return
                        return (
                            <ListItem key={member.id} sx={memberListItemSx}
                                secondaryAction={
                                    <IconButton edge="end" aria-label="remove" sx={memberRemoveButtonSx}
                                        onClick={() => handleBoardMembers(slug, member.id, dispatch, 'remove')}>
                                        <PersonRemoveIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={member.imageURL} sx={{ bgcolor: theme.palette.primary.main }}>
                                        {member.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={member.name}
                                    secondary={member.title}
                                />
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider sx={dividerSx} />

            <Typography variant="subtitle2" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
                Search Results
            </Typography>

            <List dense>
                {
                    searchResults.length === 0 ?
                        <div className="w-full flex items-center justify-center">
                            <span className="text-lg text-gray-400 font-semibold italic">No users found</span>
                        </div> :
                        searchResults.map(user => (
                            <ListItem
                                key={user.id}
                                sx={searchResultListItemSx}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="add"
                                        onClick={() => {
                                            handleBoardMembers(slug, user.id, dispatch, 'add')
                                            setSearchUser("")
                                        }}
                                        sx={searchResultAddButtonSx}
                                    >
                                        <PersonAddAltIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar src={user.imageURL} sx={{ bgcolor: theme.palette.secondary.main, color: "#232526" }}>
                                        {user.name[0]}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={user.title}
                                />
                            </ListItem>
                        ))
                }
            </List>

            <div className="mt-8 text-center">
                <button
                    className="px-10 py-3 text-lg font-bold rounded-full border-2 border-neon bg-[#232526] text-neon transition-colors duration-150 hover:bg-neon hover:text-[#232526] cursor-pointer"
                    type="button" onClick={() => closeForm(false)}>
                    Close
                </button>
            </div>
        </Paper>
    );
}

export default ManageBoardMembers;