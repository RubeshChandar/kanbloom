import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Alert, Button, Menu, MenuItem, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import api from '@src/api';
import AutoCompleteTaskUser from '@src/components/AutoCompleteTaskUser';
import { showSnackbar } from '@src/state/SnackBarSlice';
import { RootState } from '@src/state/store';
import { DateTimePickerStyle, MenuStyle } from '@src/styles/CustomStyleMUI';
import TaskInput from '@src/styles/TaskInput';
import { priorityMap, priorityNum, Task, TaskStatus, TaskStatusLabel } from '@src/types/TaskTypes';
import { fetchTasksAndUsers } from '@src/utils/TasksHelper';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TaskPage = () => {
    const nav = useNavigate()
    const location = useLocation()
    const urlParams = new URLSearchParams(location.search).get("progress") as TaskStatus
    const { slug, taskId } = useParams<{ slug: string, taskId?: string }>();
    const members = useSelector((state: RootState) => state.boardMembers)
    const { register, handleSubmit, setValue, getValues, control, setError, reset, formState: { errors, isSubmitting } } = useForm<Task>({
        defaultValues: { priority: 2, status: urlParams ? urlParams : TaskStatus.TO_DO }
    });

    const dispatch = useDispatch()
    const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null);
    const priorityOpen = Boolean(priorityAnchorEl);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (members.length === 0) fetchTasksAndUsers(slug!, dispatch);

        const getTasks = async () => {
            const res = await api.get(`api/${slug}/tasks/${taskId}/`)
            reset(res.data)
        }

        if (taskId) getTasks();

    }, [slug, dispatch, members, taskId, reset])

    const handleFormSave = async (data: Task) => {
        if (data.status === TaskStatus.DONE && !data.completed_at) {
            setError("root", { message: "Please set a date for completed at field" })
            return
        }
        const url = taskId ? `api/${slug}/tasks/${taskId}/` : `api/${slug}/tasks/`

        await api.post(url, data)
            .then(res => {
                nav(`/boards/${slug}`, { replace: true });
                dispatch(showSnackbar({ message: res.data['data'], severity: 'success' }))
            })
            .catch(error => {
                console.log(error)
                setError("root", { message: "Something went wrong! Check console for more details!!" })
            })
    };

    return (
        <div className="bg-amber-50/10 rounded-lg p-10 m-10 w-full max-w-6xl mx-auto">
            <Typography variant="h4" align="center" className="text-primary mb-1 font-semibold tracking-wider">
                {taskId ? "Edit the Current Task" : "Create a New Task"}
            </Typography>

            <form onSubmit={handleSubmit(handleFormSave)} className="space-y-10">

                {/* Task Details Section */}
                <div className="grid grid-cols-1 gap-6 mt-5">
                    <Typography variant="h6" className='text-neon'>Task Details</Typography>

                    <TaskInput fieldName='Task Title' {...register("name")}
                        errorMessage={errors.name?.message} />

                    <TaskInput fieldName='Description' multiline={true}
                        {...register("description")} errorMessage={errors.description?.message} />
                </div>

                <div className="border-t-2 border-gray-400 my-1" />

                <div className='grid grid-cols-2 gap-6 mt-5'>
                    <Typography variant="h6" className='text-neon col-span-2'>
                        Status, Priority & Assignments
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={e => setAnchorEl(e.currentTarget)}
                        sx={{
                            p: '15px',
                            textTransform: 'none',
                            borderColor: 'white',
                            '&:hover': { borderColor: '#39FF14' }
                        }}
                    >
                        {TaskStatusLabel[getValues("status")]}
                    </Button>
                    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} slotProps={MenuStyle}>
                        {Object.values(TaskStatus).map(s =>
                            <MenuItem key={s} onClick={() => { setValue("status", s); setAnchorEl(null); }}>
                                {TaskStatusLabel[s]}
                            </MenuItem>
                        )}
                    </Menu>

                    <Button
                        variant="outlined"
                        onClick={e => setPriorityAnchorEl(e.currentTarget)}
                        sx={{
                            textTransform: 'none',
                            color: 'orange',
                            borderColor: 'white',
                            '&:hover': { borderColor: '#39FF14' }
                        }}
                    >
                        {priorityMap[getValues("priority") as priorityNum].label}
                    </Button>

                    <Menu anchorEl={priorityAnchorEl} open={priorityOpen} onClose={() => setPriorityAnchorEl(null)} slotProps={MenuStyle}>
                        {
                            ([1, 2, 3, 4] as priorityNum[]).map(p => (
                                <MenuItem key={p} onClick={() => { setPriorityAnchorEl(null); setValue("priority", p) }}>
                                    {priorityMap[p].label}
                                </MenuItem>
                            ))
                        }
                    </Menu>
                    <Controller
                        name='assigned_to'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <AutoCompleteTaskUser name='Assigned To' users={members} onChange={onChange} value={value} error={!!error} />
                        }
                    />

                    <Controller
                        name='reported_by'
                        control={control}
                        render={({ field: { onChange, value }, fieldState: { error } }) =>
                            <AutoCompleteTaskUser name='Reported By' users={members} onChange={onChange} value={value} error={!!error} />
                        }
                    />
                </div>

                <div className="border-t-2 border-gray-400 my-1" />

                {/* Status & Dates Section */}
                <div className='mt-3'>
                    <Typography variant="h6" className='text-neon'> Dates</Typography>
                    <div className="grid grid-cols-2 gap-6 mt-4">

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Controller
                                name='due_date'
                                control={control}
                                render={({ field: { value, onChange } }) =>
                                    <DateTimePicker
                                        label="Due Date"
                                        format="DD/MM/YYYY HH:mm A"
                                        value={value ? dayjs(value) : null}
                                        onChange={(d) => onChange(d?.toISOString())}
                                        className='bg-amber-50/5'
                                        slotProps={{
                                            popper: DateTimePickerStyle,
                                            openPickerButton: { sx: { color: "white" } },
                                        }}
                                    />
                                }
                            />

                            <Controller
                                name='completed_at'
                                control={control}
                                render={({ field: { value, onChange } }) =>
                                    <DateTimePicker
                                        label="Completed At"
                                        format="DD/MM/YYYY HH:mm A"
                                        value={value ? dayjs(value) : null}
                                        onChange={(d) => onChange(d?.toISOString())}
                                        className='bg-amber-50/5'
                                        disabled={getValues("status") !== TaskStatus.DONE}
                                        slotProps={{
                                            popper: DateTimePickerStyle,
                                            openPickerButton: { sx: { color: "white" } },
                                        }}
                                    />
                                }
                            />

                        </LocalizationProvider>
                    </div>
                </div>
                {taskId && (<>
                    <div className="border-t-2 border-gray-400 my-1" />
                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <Typography variant="h6" className="text-neon col-span-3">Meta Info</Typography>

                        <Typography variant="subtitle1" fontWeight="bold" className="tracking-wide">
                            <span className="text-gray-400">Created At: </span>
                            <span className="text-neon">
                                {getValues("created_at") ? dayjs(getValues("created_at")).format("D MMMM, YYYY hh:mmA") : "-"}
                            </span>
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" className="tracking-wide">
                            <span className="text-gray-400">Last Modified: </span>
                            <span className="text-neon">
                                {getValues("last_modified") ? dayjs(getValues("last_modified")).format("D MMMM, YYYY hh:mmA") : "-"}
                            </span>
                        </Typography>

                        <Typography variant="subtitle1" fontWeight="bold" className="tracking-wide col-span-1">
                            <span className="text-gray-400">Belongs To: </span>
                            <span className="text-neon">
                                {getValues("board")}
                            </span>
                        </Typography>
                    </div>
                </>)}

                <div className='grid grid-cols-2 gap-5 h-12'>
                    <Button fullWidth variant='outlined' color='warning'
                        onClick={() => { nav(`/boards/${slug}`, { replace: true }) }}>
                        <ArrowBackIcon className='me-3' /> Go Back
                    </Button>

                    <Button type="submit" fullWidth variant='contained' color='success' loading={isSubmitting}>
                        <TaskAltIcon className='me-3' /> {taskId ? "Update Task" : "Create Task"}
                    </Button>
                </div>
                {errors.root &&
                    <Alert severity="error">{errors.root?.message}</Alert>}
            </form>
        </div>
    );
};

export default TaskPage;