import { Autocomplete, Avatar, TextField } from "@mui/material";
import { getFieldStyles } from "@src/styles/CustomStyleMUI";
import { ShortendUser } from "@src/types/UserProfile";

type InputProps = {
    name: string,
    users: ShortendUser[],
    value: ShortendUser | undefined,
    error?: boolean,
    onChange: (user: ShortendUser | null) => void,
}

const AutoCompleteTaskUser = ({ name, users, value, onChange, error }: InputProps) => {
    return (
        <Autocomplete
            options={users}
            getOptionLabel={(option) => option.name}
            value={value ?? null}
            onChange={(_, newValue) => onChange(newValue)}
            renderOption={(props, option) => {
                const { key, ...rest } = props;
                return <li {...rest} key={key} className="flex items-center gap-2 py-2 px-3 cursor-pointer">
                    <Avatar alt={option.name} src={option.imageURL} />
                    <span className="text-white ms-3">{option.name} ({option.title}) </span>
                </li>
            }}
            popupIcon={<svg width="24" height="24" fill="white"><path d="M7 10l5 5 5-5z" /></svg>}
            slotProps={{
                paper: { sx: { bgcolor: "#232526", color: "#fff" } }
            }}

            renderInput={(params) =>
                <TextField
                    {...params}
                    label={name}
                    variant="outlined"
                    sx={getFieldStyles}
                    error={!!error}
                />
            }
            fullWidth
        />
    )
}

export default AutoCompleteTaskUser