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
        const todoTitle: string = "What to EAT"
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
        const todolistId: string = '781c30fa-309f-4cee-87ec-973b6a8459b3'
        const data = todolistApi.deleteTodolist(todolistId)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId: string = '781c30fa-309f-4cee-87ec-973b6a8459b3'
        const newTodoTitle: string = "THIS WILL BEee DELETED"
        const data = todolistApi.updateTodolist(todoId, newTodoTitle)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

