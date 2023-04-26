import { TranslationKey } from '../../i18n/locales/en'

/**
 * Use this to throw errors from APIs.
 * use it like `throw new ApiError(translationKey)`
 * `translationKey` is type-safe and the compilation will fail if key is not defined in translation files.
 */
export class ApiError extends Error {

    /**
     * Default status code for ApiError hardcoded,
     * the client should rely on `errorKey` in the response to determine what exactly happened,
     * rather than on http status code.
     */
    private static readonly DEFAULT_ERROR_STATUS_CODE = 400

    readonly errorKey: TranslationKey
    readonly statusCode: HttpStatusCode
    readonly data: Record<string, unknown>

    constructor(errorKey: TranslationKey, options?: {
        statusCode?: HttpStatusCode,
        data?: Record<string, unknown>,
    }) {
        super(errorKey)
        this.errorKey = errorKey
        this.statusCode = options?.statusCode ?? ApiError.DEFAULT_ERROR_STATUS_CODE
        this.data = options?.data ?? {}
    }
}
