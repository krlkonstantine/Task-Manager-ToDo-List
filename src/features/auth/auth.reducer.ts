import {createSlice} from "@reduxjs/toolkit";
import {appActions} from "app/app.reducer";
import {authAPI, LoginParamsType} from "features/auth/auth.api";
import {clearTasksAndTodolists} from "common/actions";
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from "common/utils";
import {ResultCode} from "common/enums";
import {securityAPI} from "features/auth/captcha/security.api";

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>("auth/login", async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true};
    } else if (res.data.resultCode === ResultCode.Captcha){
        authThunks.getCaptchaUrl({})
        return rejectWithValue (null)
    }
    else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, dispatch, isShowAppError);
        return rejectWithValue({data: res.data, showGlobalError: true});
    }

});


const getCaptchaUrl = createAppAsyncThunk<{ captchaUrl: string }, {}>("auth/getCaptcha", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const res = await securityAPI.getCaptchaUrl();
    const captchaUrl = res.data.url
    if (captchaUrl) {
        return captchaUrl
    } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, dispatch, isShowAppError);
        return rejectWithValue({data: res.data, showGlobalError: true});
    }
});


const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("auth/logout", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearTasksAndTodolists());
        return {isLoggedIn: false};
    } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
    }

});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>("app/initializeApp", async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === ResultCode.Success) {
            return {isLoggedIn: true};
        } else {
            return rejectWithValue(null);
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppInitialized({isInitialized: true}));
    }
});

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        captcha: ""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(getCaptchaUrl.fulfilled, (state, action) => {
                state.captcha = action.payload.captchaUrl;
            });

    },
});

export const authReducer = slice.reducer;
export const authThunks = {login, logout, initializeApp, getCaptchaUrl};
