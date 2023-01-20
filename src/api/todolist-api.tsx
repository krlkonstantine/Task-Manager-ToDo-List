import React, {useEffect, useState} from 'react'
import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        "API-KEY": "6e490809-b79a-461b-a16b-15a2bab53f33"
    }
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistAPIType[]>('/todo-lists')
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item:TodolistAPIType}>>("/todo-lists", {title})
            .then((res) => res.data)
    },
    deleteTodolist(todoId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoId}`)
            .then((res) => res.data)
    },
    updateTodolist(todoId: string, newTitle: string) {
        return instance.put<ResponseType>(`/todo-lists/${todoId}`, {newTitle})
            .then((res) => res.data)

    }

}

export type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type TodolistPostType = {
    resultCode: number
    messages: string[],
    data: {
        item: TodolistAPIType
    }
}
type UpdateTodolistType = {
    resultCode: number
    messages: string[],
    data: {}
}
type DeleteTodolistType = {
    resultCode: number
    messages: string[],
    data: {}
}
type ResponseType<D={}> = {
    resultCode: number
    messages: string[],
    data: D
}