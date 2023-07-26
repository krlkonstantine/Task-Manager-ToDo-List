import { tasksReducer } from "features/todolists-list/tasks/model/tasks.reducer";
import { todolistsReducer } from "features/todolists-list/todolists/model/todolists.reducer";
import { AnyAction, combineReducers } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/app.reducer";
import { authSlice } from "features/auth/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>;

// @ts-ignore
window.store = store;
