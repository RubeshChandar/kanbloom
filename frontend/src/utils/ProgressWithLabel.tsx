import { Box, Typography } from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import CircularProgress, { CircularProgressProps, } from '@mui/material/CircularProgress';
import theme from '../styles/MaterialTheme';


export const LinearProgressWithLabel = (props: LinearProgressProps & { value: number }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" color='primary' {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography
                    variant="body2"
                    sx={{ color: 'custom.neon' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}


export const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                {...props}
                thickness={5}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    component="div"
                    sx={{ color: theme.palette.custom.neon, fontWeight: 700, fontSize: '0.85rem' }}
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    );
}
