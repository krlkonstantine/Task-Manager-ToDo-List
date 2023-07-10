import { commonApi } from "common/api/common.api";
import { ResponseType } from "common/api/types-api";

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};

export const authAPI = {
  login(data: LoginParamsType) {
    const promise = commonApi.post<ResponseType<{ userId?: number }>>("auth/login", data);
    return promise;
  },
  logout() {
    const promise = commonApi.delete<ResponseType<{ userId?: number }>>("auth/login");
    return promise;
  },
  me() {
    const promise = commonApi.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
    return promise;
  },
};
