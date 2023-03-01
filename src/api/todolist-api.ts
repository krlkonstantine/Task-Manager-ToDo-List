import axios from "axios";
import {CreateTodolist, GetTodolists} from "../stories/todolist-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '6e490809-b79a-461b-a16b-15a2bab53f33'
    }
}

export const todolistApi = {

    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => res.data)
    },
    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
            .then((res) => res.data)

    },

    deleteTodolist(id: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
            .then((res) => res.data)

    },

    updateTodolist(todoId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`, {title}, settings)
            .then((res) => res.data)

    }
}