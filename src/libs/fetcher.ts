import { appConfig } from "@/config/app.config";
import * as SecureStore from "expo-secure-store";

const getSessionId = async () => {
    return await SecureStore.getItemAsync("sessionId");
};

const handleResponse = async <T>(res: Response) => {
    if (res.status === 204) {
        return {} as T;
    }

    const resJson = await res.json();

    if (!res.ok) {
        const message = resJson.message || resJson.error || res.statusText || "Unknown error";
        throw new Error(message);
    }

    return resJson as T;
};

export const createFetcher = (apiUrl: string) => {
    const fetcher = (path: string, init?: RequestInit) => {
        const url = `${apiUrl}${path}`;
        return fetch(`${url}`, init);
    };

    return {
        get: async <T>(path: string, init?: RequestInit): Promise<T> => {
            const sessionId = await getSessionId();

            const res = await fetcher(path, {
                ...init,
                method: "GET",
                credentials: "include",
                headers: {
                    ...(init?.headers ?? {}),
                    "x-session-id": sessionId ?? "",
                },
            });
            return handleResponse<T>(res);
        },

        post: async <T>(path: string, data?: any, init?: RequestInit): Promise<T> => {
            const sessionId = await getSessionId();
            const contentType = data instanceof FormData ? "multipart/form-data" : "application/json";

            const res = await fetcher(path, {
                ...init,
                method: "POST",
                credentials: "include",
                body: contentType === "application/json" ? JSON.stringify(data) : data,
                headers: {
                    ...(init?.headers ?? {}),
                    ...(contentType === "application/json" ? { "Content-Type": contentType } : undefined),
                    "x-session-id": sessionId ?? "",
                },
            });

            return handleResponse<T>(res);
        },

        patch: async <T>(path: string, data?: any, init?: RequestInit): Promise<T> => {
            const sessionId = await getSessionId();
            const contentType = data instanceof FormData ? "multipart/form-data" : "application/json";

            const res = await fetcher(path, {
                ...init,
                method: "PATCH",
                credentials: "include",
                body: contentType === "application/json" ? JSON.stringify(data) : data,
                headers: {
                    ...(init?.headers ?? {}),
                    ...(contentType === "application/json" ? { "Content-Type": contentType } : undefined),
                    "x-session-id": sessionId ?? "",
                },
            });

            return handleResponse(res);
        },

        delete: async <T>(path: string, init?: RequestInit): Promise<T> => {
            const sessionId = await getSessionId();

            const res = await fetcher(path, {
                ...init,
                method: "DELETE",
                credentials: "include",
                headers: {
                    ...(init?.headers ?? {}),
                    "x-session-id": sessionId ?? "",
                },
            });

            return handleResponse(res);
        },
    };
};

export const fetcher = createFetcher(appConfig.apiUrl);
