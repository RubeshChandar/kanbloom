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

type UpdateTaskDetailsTypeBackend = {
    task_id: string,
    assigned_to_id?: string,
    due_date?: string,
    priority?: number,
}

export const updateTaskDetailBackend = async (slug: string, dispatch: Dispatch, taskDetails: UpdateTaskDetailsTypeBackend) => {
    api
        .patch(`api/${slug}/tasks/update-status/${taskDetails.task_id}/`, taskDetails)
        .then((res) => {
            dispatch(showSnackbar({
                message: res.data['data'],
                severity: "success"
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

export const handleBoardMembers = async (slug: string, userID: string, dispatch: Dispatch, action: "add" | "remove") => {
    const request =
        action === "add"
            ? api.post(`user/${slug}/handle-users/`, { user_id: userID })
            : api.delete(`user/${slug}/handle-users/`, { params: { user_id: userID } });

    request.then(res => {
        dispatch(setBoardMembers(res.data));
    });

}

export const deleteTaskBackend = async (slug: string, taskID: string, dispatch: Dispatch) => {
    api.delete(`/api/${slug}/tasks/update-status/${taskID}`)
        .then(res => {
            if (res.status === 200) {
                dispatch(showSnackbar({
                    message: res.data['data'],
                    severity: "success",
                }))
            }
        })
        .catch(error => {
            dispatch(showSnackbar({
                message: "Error Occured check console",
                severity: "error",
            }))
            console.log(error)
        })
}