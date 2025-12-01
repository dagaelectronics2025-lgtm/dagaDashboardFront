import type {UseMutationOptions, UseQueryOptions} from "@tanstack/react-query";
import {useMutation, useQuery,} from '@tanstack/react-query'
import type {ApiError} from "@/shared/hooks/useApi/types.ts";
import {useAuthStore} from "@/shared/stores/authStore.ts";

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL

const httpClient = async <TResponse>(
    endpoint: string,
    options: RequestInit & { token?: string } = {}
): Promise<TResponse> => {
    const {accessToken} = useAuthStore.getState();

    const url = `${BASE_URL}${endpoint}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (accessToken) {
        // @ts-ignore
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
        let error: { statusCode?: number; message?: string };
        try {
            error = await response.json();
        } catch {
            error = {message: 'Unknown error occurred', statusCode: response.status};
        }

        throw {
            message: error.message,
            status: response.status,
        };
    }

    if (response.status === 204) {
        return {} as TResponse;
    }

    return response.json();
}

export const useApi = () => {

    const useGet = <TOutput>(
        endpoint: string,
        options?: Omit<UseQueryOptions<TOutput, ApiError>, 'queryKey' | 'queryFn'>
    ) => {
        return useQuery<TOutput, ApiError>({
            queryKey: [endpoint],
            queryFn: () => httpClient<TOutput>(endpoint),
            ...options,
        })
    }

    const usePost = <TOutput, TInput>(
        endpoint: string,
        options?: Omit<UseMutationOptions<TOutput, ApiError, TInput>, 'mutationFn'>
    ) => {
        return useMutation<TOutput, ApiError, TInput>({
            mutationFn: (data: TInput) =>
                httpClient<TOutput>(endpoint, {
                    method: 'POST',
                    body: JSON.stringify(data),
                }),
            ...options
        })
    }

    const usePut = <TOutput, TInput>(
        endpoint: string,
        options?: Omit<UseMutationOptions<TOutput, ApiError, TInput>, 'mutationFn'>
    ) => {
        return useMutation<TOutput, ApiError, TInput>({
            mutationFn: (data: TInput) =>
                httpClient<TOutput>(endpoint, {
                    method: 'PUT',
                    body: JSON.stringify(data),
                }),
            ...options,
        })
    }

    const useDelete = <TOutput = void>(
        endpoint: string,
        options?: Omit<UseMutationOptions<TOutput, ApiError>, 'mutationFn'>
    ) => {
        return useMutation<TOutput, ApiError>({
            mutationFn: () =>
                httpClient<TOutput>(endpoint, {
                    method: 'DELETE',
                }),
            ...options,
        })
    }

    const usePatch = <TOutput, TInput>(
        endpoint: string,
        options?: Omit<UseMutationOptions<TOutput, ApiError, TInput>, 'mutationFn'>
    ) => {
        return useMutation<TOutput, ApiError, TInput>({
            mutationFn: (data: TInput) =>
                httpClient<TOutput>(endpoint, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                }),
            ...options,
        })
    }

    return {
        useGet,
        usePost,
        usePut,
        useDelete,
        usePatch,
    }
}