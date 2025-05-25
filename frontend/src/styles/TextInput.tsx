import { FormControl, FormHelperText, InputLabel, OutlinedInput } from '@mui/material';
import { forwardRef } from 'react';
import theme from './MaterialTheme';


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

type InputProps = {
    fieldname: string,
    type?: string,
    error?: string;
    endAdornment?: React.ReactNode;
    multiline?: boolean;
}


export const TextInput = forwardRef<HTMLInputElement, InputProps>(
    ({ fieldname, error, type = "text", endAdornment, multiline = false, ...rest }, ref) => {
        return (
            <FormControl error={!!error}>
                <InputLabel htmlFor={fieldname} sx={LabelSX}>
                    {fieldname}
                </InputLabel>

                <OutlinedInput
                    label={fieldname}
                    id={fieldname}
                    type={type}
                    multiline={multiline}
                    rows={multiline ? 5 : undefined}
                    inputRef={ref}
                    sx={OutlinedInputSX}
                    {...rest}
                    endAdornment={endAdornment} />
                {!!error &&
                    <FormHelperText>{error}</FormHelperText>}
            </FormControl>
        )
    })

