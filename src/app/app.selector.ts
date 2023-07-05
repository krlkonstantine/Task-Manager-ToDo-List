import { AppRootStateType } from "app/store";

export const appStatusSelector = (state: AppRootStateType) => state.app.status;
export const isInitializedSelector = (state: AppRootStateType) => state.app.isInitialized;
export const isLoggedInSelector = (state: AppRootStateType) => state.auth.isLoggedIn;
