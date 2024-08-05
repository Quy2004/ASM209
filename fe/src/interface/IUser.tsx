export interface IUser  {
    _id: string|number;
    name: string;
    email: string;
    phone: string;
    password: string;
    avatar: string;
    role: number;
    passwordResetToken: string;
  };