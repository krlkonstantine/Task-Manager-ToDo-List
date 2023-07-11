import { commonApi } from "common/api/common.api";
import {
  CreateTaskArgType,
  GetTasksResponse,
  ResponseType,
  TaskType,
  TodolistType,
  UpdateTaskArgType,
} from "common/api/types-api";

// api
export const todolistsAPI = {
  getTodolists() {
    return commonApi.get<TodolistType[]>("todo-lists");
  },
  createTodolist(arg: { title: string }) {
    return commonApi.post<ResponseType<any>>("todo-lists", { title: arg.title });
  },
  deleteTodolist(arg: { id: string }) {
    return commonApi.delete<ResponseType>(`todo-lists/${arg.id}`);
  },
  updateTodolist(arg: { id: string; title: string }) {
    return commonApi.put<ResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
  },
  getTasks(todolistId: string) {
    return commonApi.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return commonApi.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(arg: CreateTaskArgType) {
    return commonApi.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, {
      title: arg.title,
    });
  },
  updateTask(arg: UpdateTaskArgType) {
    return commonApi.put<ResponseType<TaskType>>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`, arg.domainModel);
  },
};
