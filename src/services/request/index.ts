import type { AxiosRequestConfig } from "axios";
import { api } from "../api";
import { handleApiError } from "./handleApiError";

type GetParams = AxiosRequestConfig & {
    url: string;
};

type BodyParams = AxiosRequestConfig & {
    url: string;
    body?: unknown;
};

export const apiService = {
    get: async <T>({ url, ...config }: GetParams): Promise<T> => {
        try {
            const { data } = await api.get<T>(url, config);
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    post: async <T>({ url, body }: BodyParams): Promise<T> => {
        try {
            const { data } = await api.post<T>(url, body);
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    put: async <T>({ url, body}: BodyParams): Promise<T> => {
        try {
            const { data } = await api.put<T>(url, body);
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    patch: async <T>({ url, body }: BodyParams): Promise<T> => {
        try {
            const { data } = await api.patch<T>(url, body);
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },

    delete: async <T = void>({ url, ...config }: GetParams): Promise<T> => {
        try {
            const { data } = await api.delete<T>(url, config);
            return data;
        } catch (error) {
            handleApiError(error);
            throw error;
        }
    },
};