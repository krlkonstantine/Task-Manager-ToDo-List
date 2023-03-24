import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../app/app-reducer'
import {authAPI, ResultLoginCode} from "../../api/todolists-api";
import {FormDataType} from "./Login";
import {handleServerAppError} from "../../utils/error-utils";

const initialState = {
    isInitialized: false,
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
export const setIsInitializedAC = (value: boolean) =>
    ({type: 'login/SET-IS-INITIALIZED', value} as const)

// thunks
export const loginTC = (data: FormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.resultCode === ResultLoginCode.Ok) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setIsInitializedAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res, dispatch)
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    }
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me().then(res => {
        if (res.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setIsInitializedAC(true));
            dispatch(setAppStatusAC('succeeded'))
        } else {
            dispatch(setIsInitializedAC(true));
            handleServerAppError(res, dispatch)
        }
    })
}

// types
type ActionsType =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setIsInitializedAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
