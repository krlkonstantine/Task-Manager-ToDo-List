import React, {useEffect, useState} from 'react'
import axios from "axios"

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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoTitle: string = "What to order"
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: todoTitle}, settings)
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '3fd73b21-7373-44a8-9441-ee8c6f21a6d2'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoId: string = '21ce9fa5-a22f-4f04-8126-561268c9ec1d'
        const newTodoTitle: string = "React-JSssssssssss"
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title: newTodoTitle}, settings)
            .then((res) => {
                debugger
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

