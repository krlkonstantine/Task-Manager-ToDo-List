import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer'
import {
    ResultCode,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {
    RequestStatusType,
    setErrorAC,
    SetErrorACType,
    setLoadingStatusAC,
    SetLoadingStatusACType
} from "../../app/app-reducer";
import {CustomErrorType, handleNetworkServerError, handleServerAppError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "CHANGE-TASK-ENTITY-STATUS" :
            return {
                ...state,
                [action.todoId]: state[action.todoId]
                    .map((tsk) => tsk.id === action.taskId
                        ? {...tsk, taskEntityStatus: action.taskEntityStatus} : tsk)
            }
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// actions
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const changeTaskEntityStatusAC = (todoId: string, taskId: string, taskEntityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', todoId, taskId, taskEntityStatus} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
            dispatch(setLoadingStatusAC('succeeded'))
        })
        .catch((error: AxiosError<CustomErrorType>) => {
            handleNetworkServerError(dispatch, error)
        })
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            const action = removeTaskAC(taskId, todolistId)
            dispatch(action)
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'succeeded'))
        })
        .catch((error: AxiosError<CustomErrorType>) => {
            handleNetworkServerError(dispatch, error)
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'failed'))
        })
}
export const addTaskTC = (title: string, todolistId: string) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setLoadingStatusAC('loading'))
    try {
        const result = await todolistsAPI.createTask(todolistId, title)
        if (result.data.resultCode === ResultCode.SUCCEEDED) {
            dispatch(addTaskAC(result.data.data.item))
            dispatch(setLoadingStatusAC('succeeded'))
        } else {
            handleServerAppError(result.data, dispatch)
        }
    } catch (err) {
        if (axios.isAxiosError<{ message: string }>(err)) {
            handleNetworkServerError(dispatch, err)
        }
    }

    /*.then(res => {

        })
        .catch((e) => {
            dispatch(setErrorAC(e.message))
            dispatch(setLoadingStatusAC('failed'))
        })*/

}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        dispatch(setLoadingStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC(todolistId, taskId,'loading'))

        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            dispatch(setLoadingStatusAC('succeeded'))
            dispatch(changeTaskEntityStatusAC(todolistId, taskId,'succeeded'))

            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === ResultCode.SUCCEEDED) {
                    dispatch(setLoadingStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'succeeded'))

                    dispatch(setErrorAC(null))
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatusAC(todolistId, taskId,'failed'))

                }
            })
            .catch((error: AxiosError<CustomErrorType>) => {
                handleNetworkServerError(dispatch, error)
                dispatch(changeTaskEntityStatusAC(todolistId, taskId,'failed'))
            })
    }

// types

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof changeTaskEntityStatusAC>
    | SetLoadingStatusACType
    | SetErrorACType
