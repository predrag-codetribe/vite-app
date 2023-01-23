import i18n from '@/i18n/i18n'
import { toast } from 'react-toastify'
import axios from 'axios'

export function handleError(error: unknown) {
    if (axios.isCancel(error)) {
    // ignore cancelled request
        console.warn(error)
        return
    }

    console.error(error) // always log errors

    // handle backend errors
    if (isBackendError(error)) {
        toast(error.response.data.message)
        return
    }

    // handle cognito errors
    if(isAuthError(error)) {
        toast(error.message)
        return
    }

    // fallback to a toast with generic error message
    // for errors that are not from backend or cognito.
    const defaultMessage: string = i18n.t('global.an_error_occurred_try_again')
    toast(defaultMessage)
}

type BackendError = {
    response: {
        data: {
            message: string
        }
    }
}
export function isBackendError(error: unknown): error is BackendError {
    const isBackendError = typeof error === 'object'
    && error !== null
    && Boolean((error as BackendError)?.response?.data?.message)
    return isBackendError
}

type AuthError = {
    message: string
}
export function isAuthError(error: unknown): error is AuthError {
    const isError = typeof error === 'object'
    && error !== null
    && Boolean((error as AuthError)?.message)
    return isError
}
