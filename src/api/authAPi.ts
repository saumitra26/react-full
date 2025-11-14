import type { AuthUser, LoginRequest, RegisterRequest } from "../dataModel/auth";
import  axiosClient  from './axiosClient';

type token = {
    token:string
}
export const authApi = {
    login: (payload: LoginRequest) => axiosClient.post<token>("/auth/login", payload).then(response => response.data),
    register:(payload:RegisterRequest)=>axiosClient.post<string>("/auth/register",payload).then(response=>response.data)
}

