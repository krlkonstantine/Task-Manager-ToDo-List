import axios from "axios";
import {CreateTodolist, GetTodolists} from "../stories/todolist-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6e490809-b79a-461b-a16b-15a2bab53f33'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '6e490809-b79a-461b-a16b-15a2bab53f33'
    }
})

export const todolistApi = {

    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
            .then((res) => res.data)
    },

    updateTodolist<ResponseType>(todoId: string, title: string) {
        return instance.put(`todo-lists/${todoId}`, {title})
            .then((res) => res.data)

    },

    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`)
            .then((res) => res.data)

    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>('todo-lists', {title})
            .then((res) => res.data)
    }
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    data: T
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
