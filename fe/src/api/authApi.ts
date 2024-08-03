import apiClient from "../api/apiClient";

export interface IRegisterBody {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IResetPasswordBody {
  password: string;
  confirmPassword: string;
  token: string;
}
type User_Save = {
  id: string;
  email: string;
  name: string;
  phone : string;
  avatar : string;
};
export const AuthApi = {
  register: (data: IRegisterBody) => apiClient.post("/register", data),
  login: (data: ILoginBody) => apiClient.post("/login", data),
  Save_User : (data :User_Save) => apiClient.post("/save_user", data),
  forgotPassword: (email: string) => {
    return apiClient.post("/forgot-password", { email });
  },
  resetPassword: (data: IResetPasswordBody) => {
    return apiClient.post("/reset-password", data);
  },
};
