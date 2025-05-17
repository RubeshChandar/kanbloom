import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { hideSnackbar } from '../state/SnackBarSlice';

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