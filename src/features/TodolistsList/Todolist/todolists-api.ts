import { commonApi } from "common/api/common.api";
import {
  CreateTaskArgType,
  GetTasksResponse,
  ResponseType,
  TaskType,
  TodolistType,
  UpdateTaskArgType,
  UpdateTaskModelType,
} from "common/api/types-api";

// api
export const todolistsAPI = {
  getTodolists() {
    const promise = commonApi.get<TodolistType[]>("todo-lists");
    return promise;
  },
  createTodolist(title: string) {
    const promise = commonApi.post<ResponseType<any>>("todo-lists", { title: title });
    return promise;
  },
  deleteTodolist(id: string) {
    const promise = commonApi.delete<ResponseType>(`todo-lists/${id}`);
    return promise;
  },
  updateTodolist(id: string, title: string) {
    const promise = commonApi.put<ResponseType>(`todo-lists/${id}`, { title: title });
    return promise;
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
