
export class ForbiddenError extends Error {
    constructor(reason = '') {
        super('Forbidden! ' + reason)
    }
}
