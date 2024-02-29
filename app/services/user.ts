import { User } from "@models/user";
import { serviceAdapter } from "@utils/adapters/serviceAdapters";
import api from "./api";

const login = async (email: string, password: string) => {
  return api
    .post<User>("user/login", {
      email,
      password,
    })
    .then(serviceAdapter);
};

const register = async (
  name: string,
  email: string,
  password: string,
  phone: string,
  cpf: string
) => {
  return api
    .post<void>("user/register", {
      name,
      email,
      password,
      phone,
      cpf,
    })
    .then(serviceAdapter);
};

const generateResetPasswordLink = async (email: string) => {
  return api
    .post<void>("user/resetPassword", {
      email,
    })
    .then(serviceAdapter);
};

const resetPassword = async (password: string, guid: string) => {
  return api
    .post<void>(`user/resetPassword/${guid}`, {
      password,
    })
    .then(serviceAdapter);
};

const refreshToken = async (userId: string, refreshToken: string) => {
  return api
    .get<{ token: string; refreshToken: string }>(
      `user/refreshToken/${userId}/${refreshToken}`
    )
    .then(serviceAdapter);
};

const update = async (name: string, password?: string) => {
  return api
    .putAuth<User>(`user`, {
      name,
      password,
    })
    .then(serviceAdapter);
};

export const userService = {
  login,
  register,
  generateResetPasswordLink,
  resetPassword,
  update,
  refreshToken,
};
