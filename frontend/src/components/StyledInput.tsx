import { OutlinedInput, FormControl, InputLabel, FormHelperText } from '@mui/material';
import theme from '../styles/MaterialTheme';
import { Controller, Control } from 'react-hook-form';
import { Login } from '../types/AuthTypes';


const LabelSX = {
    color: theme.palette.secondary.main, // soft grey label
    '&.Mui-focused': {
        color: theme.palette.custom.neon, // neon lime when focused
    },
}

const OutlinedInputSX = {
    '& input': {
        color: theme.palette.text.primary, // input text
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.dark, // default border
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main, // hover border
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.custom.neon, // focused border
    },
}

type Inputprops = {
    fieldname: keyof Login,
    control: Control<Login>,
    type?: string,
}


export const StyledInput = ({ fieldname, control, type = "text" }: Inputprops) => {
    return (
        <Controller name={fieldname} control={control} render={({ field, fieldState }) => (
            <FormControl error={!!fieldState.error}>
                <InputLabel htmlFor={fieldname} sx={LabelSX}>
                    {fieldname.toString().charAt(0).toUpperCase() + fieldname.slice(1)}
                </InputLabel>

                <OutlinedInput
                    {...field}
                    value={field.value ?? ''}
                    label={fieldname}
                    type={type}
                    sx={OutlinedInputSX}
                />
                {!!fieldState.error && <FormHelperText id="component-error-text">{fieldState.error.message}</FormHelperText>}
            </FormControl>
        )} />


    )
}
