export interface ApiResponse<T> {
    data: T
    message?: string
    status: number
}

export interface ApiError {
    message: string
    status: number
}

export interface QueryOptions {
    staleTime?: number
    cacheTime?: number
    enabled?: boolean
    retry?: boolean | number
    token?: string
}

// export interface MutationOptions<T> {
//     onSuccess?: (data: T) => void
//     onError?: (error: ApiError) => void
//     onSettled?: () => void
//     token?: string
// }