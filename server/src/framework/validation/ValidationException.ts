
export class ValidationException extends Error {

    errors: Json[]

    constructor(message: string) {
        super(message)
    }

    static withErrors(errors: Json[]): ValidationException {
        const retval = new ValidationException('ValidationException!')
        retval.errors = errors
        return retval
    }
}
