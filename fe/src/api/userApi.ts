import apiClient from "../api/apiClient";

interface IUpdateUserBody {
  userId: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export const UserApi = {
  update: ({ userId, ...data }: IUpdateUserBody) => {
    return apiClient.put(`/user/${userId}`, data);
  },
};
