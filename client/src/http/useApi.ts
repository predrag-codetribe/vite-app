import { API_PATHS, ApiInput, ApiOutput } from '@app/shared/protocol'
import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { backend, queryClient } from './core/backend'

export function useGet<Path extends API_PATHS>(path: Path, input: ApiInput<Path>, options: UseQueryOptions<ApiOutput<Path>> = {}) {
    return useQuery<ApiOutput<Path>>(
        {
            queryKey: [ path, input ],
            queryFn: async () => (await backend.request<ApiOutput<Path>>({
                method: 'get',
                url: path,
                params: input
            })).data,
            ...options
        }
    )
}

export function usePost<Path extends API_PATHS>(path: Path, { onSuccess, ...otherOptions }: UseMutationOptions<ApiOutput<Path>, unknown, ApiInput<Path>> = {}) {
    return useMutation({
        ...otherOptions,
        mutationFn: async (data: ApiInput<Path>) => (await backend.request<ApiOutput<Path>>({
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
