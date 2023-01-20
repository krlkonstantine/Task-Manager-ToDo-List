import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "6e490809-b79a-461b-a16b-15a2bab53f33"
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((res) => {
                setState(res.data)
            })
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'React&Redux'
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoId = "601794f7-88ac-4b81-a02f-1586be566bcb"
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let newTitle = "New Task"
        let todoId = "be056ba1-f975-40a6-be7e-b11d215e5be3"

        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,{newTitle}, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
