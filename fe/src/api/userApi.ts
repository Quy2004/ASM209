import apiClient from "../api/apiClient";

interface IUpdateUserBody {
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role?: number;
  password?: string;
}

export const UserApi = {
  update: ({ userId, ...data }: IUpdateUserBody) => {
    return apiClient.put(`/user/${userId}`, data);
  },
  getUsers: () => {
    return apiClient.get("/user");
  },
  removeUser: (userId: string) => {
    return apiClient.delete(`/user/${userId}`);
  },
};
