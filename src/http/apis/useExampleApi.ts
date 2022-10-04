import { http, PaginatedResponse, queryClient } from '@/http/http'
import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query'

const userKey = {
    getUser: 'getUser',
    getAllUsers: 'getAllUsers'
}

export const useGetUser = (id: string) => {
    return useQuery<GetUserResponse>(
        [userKey.getUser, id],
        async () => (await http({ method: 'get', url: `/users/${id}` })).data
    )
}

export const useGetAllUsers = (params: GetAllUsersParams, options?: UseQueryOptions<GetAllUsersResponse>) => {
    return useQuery<GetAllUsersResponse>(
        [userKey.getAllUsers, params],
        async () => (await http({ method: 'get', url: '/users', params })).data,
        options
    )
}

export const useCreateUser = () => {
    return useMutation(
        async (data: CreateUserRequest) => http({ method: 'post', url: '/users', data }), {
            onSuccess() {
                queryClient.invalidateQueries([userKey.getAllUsers])
            }
        }
    )
}

export const useEditUser = () => {
    return useMutation(
        async ({ id, data }: EditUserPayload) => http({ method: 'put', url: `/users/${id}`, data }), {
            onSuccess() {
                queryClient.invalidateQueries([userKey.getAllUsers])
                queryClient.invalidateQueries([userKey.getUser])
            }
        }
    )
}

export const useArchiveUser = () => {
    return useMutation(
        async (id: string) => http({ method: 'post', url: `/users/${id}/archive` }), {
            onSuccess() {
                queryClient.invalidateQueries([userKey.getAllUsers])
                queryClient.invalidateQueries([userKey.getUser])
            }
        }
    )
}

export type CreateUserRequest = {
    name: string
    surname: string
    email: string
}

export type GetUserResponse = {
    id: string
    name: string
    surname: string
    email: string
}

export type EditUserPayload = {
    id: string
    data: EditUserRequest
}

export type EditUserRequest = {
    name: string
    surname: string
    email: string
}

export type GetAllUsersParams = {
    offset: number
    limit: number
}

export type GetAllUsersResponse = PaginatedResponse<UserListItem>
export type UserListItem = {
    id: string
    name: string
    surname: string
    email: string
}
