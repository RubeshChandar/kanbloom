import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { updateTaskDetails } from '@src/state/TasksSlice';
import { updateTaskDetailBackend } from '@src/utils/TasksHelper';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { DateTimePickerStyle } from './CustomStyleMUI';


const MyDateTimePicker = ({ task_id, current_date, slug }: { task_id: string; current_date: string, slug: string }) => {
    const [openCalendar, setOpenCalendar] = useState(false);
    const [selectedDateTime, setSelectedDateTime] = useState<Dayjs | null>(dayjs(current_date));
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
                    popper: DateTimePickerStyle,
                }}
            />
        </LocalizationProvider>
    );
};

export default MyDateTimePicker;