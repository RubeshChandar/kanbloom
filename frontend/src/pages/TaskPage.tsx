import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AutoCompleteTaskUser from '@src/components/AutoCompleteTaskUser';
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
    const { slug } = useParams<{ slug: string }>();
    const members = useSelector((state: RootState) => state.boardMembers)

    const { register, handleSubmit, setValue, getValues, control, formState: { errors } } = useForm<Task>({
        defaultValues: { priority: 2, status: urlParams }
    });

    const dispatch = useDispatch()
    const [priorityAnchorEl, setPriorityAnchorEl] = useState<null | HTMLElement>(null);
    const priorityOpen = Boolean(priorityAnchorEl);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (members.length === 0) {
            fetchTasksAndUsers(slug!, dispatch)
        }
    }, [slug, dispatch, members])

    const handleFormSave = (data: Task) => {
        // TODO: Implement save logic
        console.log(data)
    };

    return (
        <div className="bg-amber-50/10 rounded-lg p-10 m-10 w-full max-w-6xl mx-auto">
            <Typography variant="h4" align="center" className="text-primary mb-10 font-semibold tracking-wider">
                Create or Edit Task
            </Typography>

            <form onSubmit={handleSubmit(handleFormSave)} className="space-y-10">

                {/* Task Details Section */}
                <div>
                    <Typography variant="h6" className='text-neon'>Task Details</Typography>
                    <div className="grid grid-cols-2 gap-6 mt-5">
                        <TaskInput fieldName='Task Title' {...register("name")}
                            errorMessage={errors.name?.message} />

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
                    </div>

                    <TaskInput className="mt-6" fieldName='Description' multiline={true}
                        {...register("description")} errorMessage={errors.description?.message} />

                </div>

                <div className="border-t-2 border-gray-400 my-1" />

                {/* Assignment Section */}
                <div className='mt-2'>
                    <Typography variant="h6" className='text-neon'>Assignment</Typography>
                    <div className="grid grid-cols-2 gap-6 mt-4">
                        <Controller
                            name='assigned_to'
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) =>
                                <AutoCompleteTaskUser key='assigned_to' users={members} onChange={onChange} value={value} error={!!error} />
                            }
                        />

                        <Controller
                            name='reported_by'
                            control={control}
                            render={({ field: { onChange, value }, fieldState: { error } }) =>
                                <AutoCompleteTaskUser key='reported_by' users={members} onChange={onChange} value={value} error={!!error} />
                            }
                        />

                    </div>
                </div>

                <div className="border-t-2 border-gray-400 my-1" />

                {/* Status & Dates Section */}
                <div className='mt-3'>
                    <Typography variant="h6" className='text-neon'>Status & Dates</Typography>
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
                                        slotProps={{
                                            popper: DateTimePickerStyle,
                                            openPickerButton: { sx: { color: "white" } },
                                        }}
                                    />
                                }
                            />

                        </LocalizationProvider>

                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-6">
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

                    </div>

                </div>

                <div className='grid grid-cols-2 gap-5 h-12'>
                    <Button fullWidth variant='outlined' color='warning'
                        onClick={() => { nav(`/boards/${slug}`, { replace: true }) }}>
                        Go Back
                    </Button>

                    <Button type="submit" fullWidth variant='contained' color='success'>
                        Save Task
                    </Button>
                </div>
            </form >
        </div >
    );
};

export default TaskPage;