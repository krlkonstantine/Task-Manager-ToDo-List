import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistApi.getTodolists()
        .then((res)=>{
            setState(res)
        })
    }, [])
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    let title = 'React&Redux'

    useEffect(() => {
        todolistApi.createTodolist(title)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    let todoId = "2e080925-02e4-4e57-9730-4936d9d37535"

    useEffect(() => {
        todolistApi.deleteTodolist(todoId)
            .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    let newTitle = "New Task"
    let todoId = "be056ba1-f975-40a6-be7e-b11d215e5be3"

    useEffect(() => {
       todolistApi.updateTodolist(todoId,newTitle)
           .then((res) => {
                setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
