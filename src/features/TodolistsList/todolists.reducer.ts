import { todolistsAPI } from "features/TodolistsList/Todolist/todolists-api";
import { appActions, RequestStatusType } from "app/app.reducer";
import { AppThunk } from "app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { FilterValuesType, TodolistDomainType, TodolistType } from "common/api/types-api";
import { createAppAsyncThunk } from "common/utils";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    /*removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
      // return state.filter(tl => tl.id !== action.payload.id)
    },*/
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
      state.unshift(newTodolist);
    },
    changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
      }
    },
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(clearTasksAndTodolists, () => {
        return [];
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      });
  },
});

// thunks

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, {}>(
  "todos/fetchTodos",
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      const res = await todolistsAPI.getTodolists();
      return { todolists: res.data };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);
/*export const _fetchTodliostsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI
      .getTodolists()
      .then((res) => {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(todolistsActions.setTodolists({ todolists: res.data }));
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };
};*/

const deleteTodolist = createAppAsyncThunk<{ id: string }, { id: string }>(
  "todos/deleteTodolist",
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    const { id } = arg;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
      dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
      const res = await todolistsAPI.deleteTodolist(id);
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { id };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

/*export const _removeTodolistTC = (id: string): AppThunk => {
  return (dispatch) => {
    //изменим глобальный статус приложения, чтобы вверху полоса побежала
    dispatch(appActions.setAppStatus({ status: "loading" }));
    //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus: "loading" }));
    todolistsAPI.deleteTodolist(id).then((res) => {
      dispatch(todolistsActions.removeTodolist({ id }));
      //скажем глобально приложению, что асинхронная операция завершена
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};*/

export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    todolistsAPI.createTodolist(title).then((res) => {
      dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
    });
  };
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => {
  return (dispatch) => {
    todolistsAPI.updateTodolist(id, title).then((res) => {
      dispatch(todolistsActions.changeTodolistTitle({ id, title }));
    });
  };
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistThunks = { fetchTodolists, deleteTodolist };
