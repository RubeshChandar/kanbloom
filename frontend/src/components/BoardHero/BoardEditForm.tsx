import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Card, CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import api from '@src/api';
import { glassyCard } from '@src/styles/CustomStyleMUI';
import { TextInput } from '@src/styles/TextInput';
import { BasicBoardEditSchema, TBasicBoardEdit } from '@src/types/BoardTypes';
import { SetStateAction } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type EditForm = {
    setShowForm: React.Dispatch<SetStateAction<boolean>>,
    basicDetail: TBasicBoardEdit,
    slug: string,
}

const BoardEditForm = ({ setShowForm, slug, basicDetail }: EditForm) => {
    const nav = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<TBasicBoardEdit>({
        resolver: zodResolver(BasicBoardEditSchema),
        defaultValues: basicDetail
    });

    const changeBoardDetails: SubmitHandler<TBasicBoardEdit> = async (data) => {
        const res = await api.post(`api/boards/${slug}/edit/`, data)
        setShowForm(false)
        nav(`/boards/${res.data.slug}?refresh=${Date.now()}`, { replace: true })
    }

    return (
        <Card
            sx={glassyCard}
            className="w-full max-w-md">
            <h2 className="mb-6 text-xl font-bold tracking-wide text-center text-white">EDIT THE BOARD</h2>
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
                            <button
                                type='submit'
                                className="p-3 font-bold text-black transition cursor-pointer bg-primary hover:brightness-90">
                                <SaveIcon className='me-2' />Save Changes
                            </button>
                            <Button variant="contained" color='error'
                                onClick={() => setShowForm(false)}>
                                <CloseIcon className='me-2' />Close
                            </Button>
                        </>
                    }
                </div>
            </form>
        </Card>
    )
}

export default BoardEditForm