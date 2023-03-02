import axios from "axios";
import {GetTasks, CreateTask, DeleteTask, UpdateTaskTitle} from "../stories/tasks-api.stories";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6e490809-b79a-461b-a16b-15a2bab53f33'
    }
})

export const tasksApi = {

    getTasks(todolistId: string) {
        return instance.get<TaskType>(`todo-lists/${todolistId}/tasks`)
            .then((res) => res.data)
    },

    createTask(todolistId: string,title: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
            .then((res) => res.data)
    },

    deleteTask(todolistId: string,id: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`)
            .then((res) => res.data)
    },

    updateTask(todolistId: string,taskId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
            .then((res) => res.data)

    }
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}
type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}
