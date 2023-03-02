import React, {useEffect, useState} from 'react'
import axios from "axios"
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6e490809-b79a-461b-a16b-15a2bab53f33'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistApi.getTodolists()
            .then((res) => {
                setState(res)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoTitle: string = "What to Buy"
        todolistApi.createTodolist(todoTitle)
            .then((res) =>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '885ecbd2-988d-4dbd-9238-4e3ebe0f1860'
        const data = todolistApi.deleteTodolist(todolistId)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId: string = '0f230e70-6420-48b2-8559-ae3abb5032da'
        const newTodoTitle: string = "THIS WILL BE USEEEEEED"
        const data = todolistApi.updateTodolist(todoId, newTodoTitle)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

