import axios from "axios"
import type { AxiosResponse } from "axios"
import type { Retard } from "../types"
export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,

    withCredentials: true,
});


export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    retardname: string;
    email: string;
    password: string;
    displayName: string;
    avatarUrl?: string;
}

export const loginRetard = async (data: LoginCredentials): Promise<Retard> => {
    const response = await api.post<Retard>("/auth/login", data);
    return response.data;
}

export const signupRetard = async (data: SignupCredentials): Promise<Retard> => {
    const response = await api.post<Retard>("/auth/register", data);
    return response.data;
}

export const logoutRetard = async (): Promise<void> => {
    await api.post("/auth/logout")
}