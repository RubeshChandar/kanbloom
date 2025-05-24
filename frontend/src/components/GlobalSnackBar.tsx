import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { hideSnackbar } from '../state/SnackBarSlice';
import { RootState } from '../state/store';

const Alert = MuiAlert as React.ElementType;

const GlobalSnackBar = () => {

    const { open, severity, message } = useSelector((state: RootState) => state.snackbar)
    const dispatch = useDispatch()

    return (
        <Snackbar
            autoHideDuration={5000}
            open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={() => { dispatch(hideSnackbar()) }}
        >
            <Alert severity={severity} onClose={() => { dispatch(hideSnackbar()) }} >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default GlobalSnackBar