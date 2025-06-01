import { Dispatch } from "@reduxjs/toolkit";
import api from "@src/api";
import { setBoardMembers } from "@src/state/BoardMembersSlice";
import { showSnackbar } from "@src/state/SnackBarSlice";
import { setTasks } from "@src/state/TasksSlice";
import { ShortendTask } from "@src/types/TaskTypes";
import axios from "axios";

export const fetchTasksAndUsers = async (slug: string, dispatch: Dispatch) => {
    try {
        const userResponse = await api.get(`user/board/${slug}/`)
        const tasksResponse = (await api.get(`api/${slug}/tasks/`)).data as ShortendTask[];
        dispatch(setTasks(tasksResponse))
        dispatch(setBoardMembers(userResponse.data))
    } catch (error) {
        console.log(error)
        if (axios.isAxiosError(error)) {
            dispatch(showSnackbar({
                message: error.response?.data['message'],
                severity: "error"
            }))
        }
    }
}

export const updateTaskStatusBackend = async (slug: string, dispatch: Dispatch, task_id: string, status: string) => {
    api
        .post(`api/${slug}/tasks/update-status/${task_id}/`, {
            task_id: task_id,
            status: status
        })
        .then((res) => {
            if (res.data['warning'])
                dispatch(showSnackbar({
                    message: res.data['warning'],
                    severity: "warning"
                }))
        })
        .catch(error => {
            console.log(error)
            dispatch(showSnackbar({
                message: "Error Occured please refresh to see the actual data",
                severity: "error"
            }))
        })
}