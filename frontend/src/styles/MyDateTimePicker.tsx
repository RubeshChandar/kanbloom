import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { updateTaskDetails } from '@src/state/TasksSlice';
import { updateTaskDetailBackend } from '@src/utils/TasksHelper';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const MyDateTimePicker = ({ task_id, current_date, slug }: { task_id: string; current_date: string, slug: string }) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs(current_date));
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleAccept = (newDate: Dayjs | null) => {
        setSelectedDateTime(newDate);
        setOpenCalendar(false);
        if (newDate) {
            dispatch(updateTaskDetails({ task_id, dueDate: newDate.toISOString() }));
            updateTaskDetailBackend(slug!, dispatch, { task_id, due_date: newDate.toISOString() })
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CalendarTodayIcon
                fontSize="small"
                className="text-gray-400"
                style={{ cursor: 'pointer' }}
                onClick={() => setOpenCalendar(true)}
            />

            <DesktopDateTimePicker
                value={selectedDateTime}
                onChange={setSelectedDateTime}
                onAccept={handleAccept}
                open={openCalendar}
                onClose={() => setOpenCalendar(false)}
                slotProps={{
                    textField: {
                        sx: {
                            position: 'absolute',
                            opacity: 0,
                            width: 0,
                            height: 0,
                            padding: 0,
                            margin: 0,
                            overflow: 'hidden',
                            pointerEvents: 'none',
                        },
                        inputProps: {
                            style: { opacity: 0, width: 0, height: 0, padding: 0, margin: 0 },
                        },
                    },
                    popper: {
                        sx: {
                            '& .MuiPaper-root, & .MuiClock-root': {
                                backgroundColor: '#333333',
                                color: theme.palette.text.primary,
                            },
                            '& .MuiPickersToolbar-root, & .MuiClockNumber-root.Mui-selected': {
                                backgroundColor: '#222222',
                                color: theme.palette.text.primary,
                            },
                            '& .MuiPickersCalendarHeader-root, & .MuiIconButton-root, & .MuiPickersDay-root, & .MuiClockNumber-root': {
                                color: theme.palette.text.primary,
                            },
                            '& .MuiPickersDay-root.Mui-selected': {
                                backgroundColor: theme.palette.primary.main,
                                color: theme.palette.text.primary,
                            },
                            '& .MuiPickersDay-root:focus.Mui-selected': {
                                backgroundColor: theme.palette.primary.dark,
                            },
                            '& .MuiPickersDay-root.MuiPickersDay-today': {
                                borderColor: theme.palette.primary.main,
                            },
                            '& .MuiPickersDay-root.Mui-disabled': {
                                color: theme.palette.text.secondary,
                            },
                            '& .MuiPickersDay-root:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                            },
                            '& .MuiClock-pin, & .MuiClockPointer-root': {
                                backgroundColor: theme.palette.primary.main,
                            },
                            '& .MuiDialogActions-root .MuiButton-root': {
                                color: theme.palette.primary.main,
                            },
                        },

                    },
                }}
            />
        </LocalizationProvider>
    );
};

export default MyDateTimePicker;