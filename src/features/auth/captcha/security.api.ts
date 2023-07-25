import {instance} from "common/api/common.api";

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<any>("security/get-captcha-url");
    },
};

export type SecurityParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};
