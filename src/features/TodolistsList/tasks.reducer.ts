import { todolistsAPI } from "features/TodolistsList/Todolist/todolists-api";
import { AppThunk } from "app/store";
import { appActions } from "app/app.reducer";
import { todolistsActions, todolistThunks } from "features/TodolistsList/todolists.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { handleServerNetworkError } from "common/utils/handle-server-network-error";
import { handleServerAppError } from "common/utils/handle-server-app-error";
import {
  CreateTaskArgType,
  DeletetaskArgType,
  TasksStateType,
  TaskType,
  UpdateDomainTaskModelType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "common/api/types-api";

const initialState: TasksStateType = {};

const slice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    /*removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
          const tasks = state[action.payload.todolistId];
          const index = tasks.findIndex((t) => t.id === action.payload.taskId);
          if (index !== -1) tasks.splice(index, 1);
        },*/
    /*updateTask: (
              state,
              action: PayloadAction<{
                taskId: string;
                model: UpdateDomainTaskModelType;
                todolistId: string;
              }>
            ) => {
              const tasks = state[action.payload.todolistId];
              const index = tasks.findIndex((t) => t.id === action.payload.taskId);
              if (index !== -1) {
                tasks[index] = { ...tasks[index], ...action.payload.model };
              }
            },*/
    /*setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
                                          state[action.payload.todolistId] = action.payload.tasks;
                                        },*/
    //этот редюсер нам больше не нужен, мы будем использовать логику в экстраредюсере
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })

      .addCase(fetchTasks.rejected, (state, action) => {})
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId];
        tasks.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.model };
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasks.splice(index, 1);
      })
      .addCase(todolistThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(clearTasksAndTodolists, () => {
        return {};
      });
  },
});

// thunks

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  "tasks/fetchTasks",
  async (todolistId, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistsAPI.getTasks(todolistId);
      const tasks = res.data.items;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      //dispatch(tasksActions.setTasks({ tasks, todolistId }));
      //здесь уже не диспатчим редюсер слайса, а возвр. таски и айди в экстраредюсер
      return { tasks, todolistId };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);
const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgType>("tasks/addTask", async (arg, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await todolistsAPI.createTask(arg);
    if (res.data.resultCode === 0) {
      const task = res.data.data.item;
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      //dispatch(tasksActions.addTask({ task }));
      return { task };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const updateTask = createAppAsyncThunk<
  { taskId: string; model: UpdateDomainTaskModelType; todolistId: string },
  UpdateTaskArgType
>("tasks/updateTask", async (arg, thunkApi) => {
  const { dispatch, rejectWithValue, getState } = thunkApi;
  const { taskId, domainModel, todolistId } = arg;
  dispatch(appActions.setAppStatus({ status: "loading" }));
  debugger;
  try {
    debugger;
    const state = getState();
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (!task) {
      console.warn("task not found in the state");
      dispatch(appActions.setAppStatus({ status: "idle" }));
      return rejectWithValue(null);
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    const res = await todolistsAPI.updateTask(arg);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { taskId, model: arg.domainModel, todolistId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const deleteTask = createAppAsyncThunk<{ taskId: string; todolistId: string }, DeletetaskArgType>(
  "tasks/removeTask",
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi;
    const { taskId, todolistId } = arg;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      const res = todolistsAPI.deleteTask(arg.todolistId, arg.taskId);
      //dispatch(tasksActions.removeTask({ taskId, todolistId }));
      return { taskId, todolistId };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = { fetchTasks, addTask, updateTask, deleteTask };
