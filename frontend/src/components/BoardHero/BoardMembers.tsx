import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Badge } from "@mui/material";
import { ShortendUser } from '@src/types/BoardTypes';

const BoardMembers = ({ owner, members }: { owner: ShortendUser, members: ShortendUser[] }) => {
    return (
        <div
            className="col-span-2 bg-white/10 backdrop-blur-md  border border-white/20 rounded-xl p-4 flex flex-col items-center h-80"
        >
            <h3 className="text-lg font-semibold text-neon mb-3">TEAM MEMBERS</h3>
            <List className="w-full max-h-100 overflow-y-auto custom-scroll-bar">
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