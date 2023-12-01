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

const register = async (name: string, email: string, password: string) => {
  return api
    .post<void>("user/register", {
      name,
      email,
      password,
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

export const userService = {
  login,
  register,
  generateResetPasswordLink,
  resetPassword,
};
