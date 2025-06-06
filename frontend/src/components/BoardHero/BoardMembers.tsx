import StarIcon from '@mui/icons-material/Star';
import { Avatar, Badge } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { RootState } from '@src/state/store';
import { ShortendUser } from '@src/types/UserProfile';
import { useSelector } from 'react-redux';

const BoardMembers = ({ owner }: { owner: ShortendUser }) => {
    const members = useSelector((state: RootState) => state.boardMembers)
    return (
        <div className='flex flex-col items-center p-4 border bg-white/10 border-white/20 rounded-xl h-80'>
            <h3 className="mb-3 text-lg font-semibold text-neon">TEAM MEMBERS</h3>
            <List className="w-full overflow-y-auto max-h-100 custom-scroll-bar">
                <ListItem alignItems="center">
                    <ListItemAvatar>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={<StarIcon fontSize="small" sx={{ color: 'gold' }} />}
                        >
                            <Avatar src={owner.imageURL} />
                        </Badge>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <span className="text-white font-bold text-[18px]">
                                {owner.name}
                            </span>
                        }
                        secondary={
                            <span className="text-teal-400 font-bold text-[13px] uppercase">
                                {owner.title}
                            </span>
                        }
                    />
                </ListItem>

                {
                    members.map((member: ShortendUser) => {
                        if (member.id === owner.id) {
                            return
                        }
                        return <ListItem alignItems="center" key={member.id}>
                            <ListItemAvatar>
                                <Avatar src={member.imageURL} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <span className="text-white font-bold text-[18px]">
                                        {member.name}
                                    </span>
                                }
                                secondary={
                                    <span className="text-teal-400 font-bold text-[13px] uppercase">
                                        {member.title}
                                    </span>
                                }
                            />
                        </ListItem>
                    })
                }
            </List>
        </div>
    )
}

export default BoardMembers