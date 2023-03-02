import React, {useEffect, useState} from 'react'
import axios from "axios"
import {todolistApi} from "../api/todolist-api";
import {tasksApi} from "../api/tasks-api";

export default {
    title: 'API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId: string = '0f230e70-6420-48b2-8559-ae3abb5032da'
        tasksApi.getTasks(todolistId)
            .then((res) => {
                setState(res)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '0f230e70-6420-48b2-8559-ae3abb5032da'
        const newTaskTitle: string = "Give me all your money"
        tasksApi.createTask(todolistId,newTaskTitle)
            .then((res) =>{
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '0f230e70-6420-48b2-8559-ae3abb5032da'
        const taskToBeDeletedId: string = "8d0cdcbd-f2f7-44fc-ba7c-571f28ad7e98"
        const data = tasksApi.deleteTask(todolistId,taskToBeDeletedId)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId: string = '0f230e70-6420-48b2-8559-ae3abb5032da'
        const taskToBeRenamedId: string = "e59473a5-7b11-48b2-9a59-b00892c797ab"
        const newTaskTitle: string = "Draw a kitten!"
        const data = tasksApi.updateTask(todolistId,taskToBeRenamedId, newTaskTitle)
        setState(data)
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

