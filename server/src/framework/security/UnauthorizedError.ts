
export class UnauthorizedError extends Error {
    constructor(reason = '') {
        super('Unauthorized! ' + reason)
    }
}
