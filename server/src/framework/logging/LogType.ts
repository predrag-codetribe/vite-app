
type LogType =
    /**
     * Request data log
     */
    | 'REQUEST'
    /**
     * Response data log
     */
    | 'RESPONSE'
    /**
     * Exceptions
     */
    | 'EXCEPTION'
    /**
     * Used whenever manually calling logger
     */
    | 'MANUAL'
    /**
     * Unauthorized request
     */
    | 'UNAUTHORIZED'
    /**
     * Forbidden - access denied request
     */
    | 'FORBIDDEN'
    /**
     * Unhandled promise rejection
     */
    | 'UNHANDLED-PROMISE-REJECTION'
    /**
     * Route not found
     */
    | 'ROUTE-NOT-FOUND'
    /**
     * Request validation exception
     */
    | 'VALIDATION-EXCEPTION'
    /**
     * Entity/entities not found
     */
    | 'ENTITY-NOT-FOUND'
