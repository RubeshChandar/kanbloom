import { TextField } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { forwardRef } from 'react';

const fieldStyles = (hasError: boolean) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: hasError ? '#f87171' : 'white',
        },
        '&:hover fieldset': {
            borderColor: hasError ? '#ef4444' : '#39FF14',
        },
        '&.Mui-focused fieldset': {
            borderColor: hasError ? '#ef4444' : '#39FF14',
        },
    }
});

type InputProps = {
    fieldName: string,
    multiline?: boolean,
    className?: string,
    errorMessage?: string,
}

const TaskInput = forwardRef<HTMLInputElement, InputProps>(
    ({ fieldName, multiline = false, className = undefined, errorMessage, ...rest }, ref) => {
        return (
            <div className={className}>
                <TextField
                    inputRef={ref}
                    label={fieldName}
                    variant="outlined"
                    fullWidth
                    required
                    className={className}
                    sx={fieldStyles(!!errorMessage)}
                    multiline={multiline}
                    rows={multiline ? 4 : undefined}
                    error={!!errorMessage}
                    {...rest}
                />
                <AnimatePresence>
                    {errorMessage && (
                        <motion.span
                            className="text-red-400 text-md mt-2 block"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.3 }}
                        >
                            {errorMessage}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        )
    })



export default TaskInput