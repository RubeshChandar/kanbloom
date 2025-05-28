import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Card, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import api from '@src/api';
import { showSnackbar } from '@src/state/SnackBarSlice';
import { glassyCard } from '@src/styles/CustomStyleMUI';
import { TextInput } from '@src/styles/TextInput';
import { BasicBoardEditSchema, TBasicBoardEdit } from '@src/types/BoardTypes';
import axios from 'axios';
import { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type EditForm = {
    setShowForm: React.Dispatch<SetStateAction<boolean>>,
    basicDetail?: TBasicBoardEdit,
    slug?: string,
    isNew?: boolean,
}

const BoardCreateOrEditForm = ({ setShowForm, slug, basicDetail, isNew = false }: EditForm) => {
    const nav = useNavigate()
    const dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<TBasicBoardEdit>({
        resolver: zodResolver(BasicBoardEditSchema),
        defaultValues: basicDetail
    });

    const changeBoardDetails: SubmitHandler<TBasicBoardEdit> = async (data) => {

        try {

            const res = isNew ?
                await api.post("api/boards/create/", data) :
                await api.put(`api/boards/${slug}/edit/`, data)

            dispatch(showSnackbar({
                message: res.data['data'],
                severity: 'success',
            }));

            setShowForm(false)
            nav(`/boards/${res.data.slug}?refresh=${Date.now()}`, { replace: true })
        }

        catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 400) {
                dispatch(showSnackbar({
                    message: error.response.data['error'],
                    severity: 'error',
                }))
                setShowForm(false)
                nav(`/boards/${error.response.data['slug']}?refresh=${Date.now()}`, { replace: true })
            }
            else {
                setShowForm(false)
                console.log(error)
            }
        }

    }

    return (
        <Card
            sx={glassyCard}
            className="w-full max-w-md">
            <h2 className="mb-6 text-xl font-bold tracking-wide text-center text-white uppercase">
                {isNew ? "Create new board" : "Edit the board"}
            </h2>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(changeBoardDetails)}>

                <TextInput
                    fieldname='Name'
                    error={errors.name?.message}
                    {...register("name")}
                />

                <TextInput
                    fieldname='Description'
                    {...register('description')}
                    error={errors.description?.message}
                    multiline
                />


                <div className="flex flex-row justify-evenly">
                    {isSubmitting
                        ? <CircularProgress />
                        :
                        <>
                            <Button variant="contained" size="large" type='submit'>
                                <SaveIcon className='me-1' /> Save Changes
                            </Button>
                            <Button variant="contained" size="large" color='error'
                                onClick={() => setShowForm(false)}>
                                <CloseIcon className='me-1' /> Close
                            </Button>

                            {/* <button
                                type='submit'
                                className="p-3 font-bold text-black transition rounded-md cursor-pointer bg-primary hover:brightness-90">
                                <SaveIcon className='me-2' />Save Changes
                            </button>
                            <Button variant="contained" color='error'
                                onClick={() => setShowForm(false)}>
                                <CloseIcon className='me-2' />Close
                            </Button> */}
                        </>
                    }
                </div>
            </form>
        </Card>
    )
}

export default BoardCreateOrEditForm