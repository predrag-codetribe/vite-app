import { API_PATHS, ApiInput, ApiOutput } from '@/shared/protocol'
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { backend, queryClient } from './core/backend'

export function useGet<Path extends API_PATHS, Input = ApiInput<Path>, Output = ApiOutput<Path>>(path: Path, input: Input, options: UseQueryOptions<Output> = {}) {
    return useQuery<Output>(
       {
            queryKey: [ path, input ],
            queryFn: async () => (await backend.request<Output>({
                method: 'get',
                url: path,
                params: input
            })).data,
            ...options
       }
    )
}

export function usePost<Path extends API_PATHS, Input = ApiInput<Path>, Output = ApiOutput<Path>>(path: Path, { onSuccess, ...otherOptions }: UseMutationOptions<Output, unknown, Input> = {}) {
    return useMutation({
       ...otherOptions,
       mutationFn: async (data: Input) => (await backend.request<Output>({
            method: 'post',
            url: path,
            data
        })).data,
       onSuccess(...args) {
        if (onSuccess) onSuccess(...args)
        else invalidateQueryClient(path)
       }
    })
}

export function invalidateQueryClient(path: API_PATHS) {
    const paths = INVALIDATE_PATH_MAP[path]
    if (paths) {
        paths.forEach((pathToInvalidate) => {
            console.warn(`Auto invalidating path '${pathToInvalidate}', because of mutation '${path}'`)
            queryClient.invalidateQueries([path])
        })
    }
}

// TODO: Explain this :D
const INVALIDATE_PATH_MAP: Partial<Record<API_PATHS, API_PATHS[]>> = {
    // getMe: [],
}
