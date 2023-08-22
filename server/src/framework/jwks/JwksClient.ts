import jwksRsa = require('jwks-rsa')

type Args = {
    jwksUri: string
}
export const createJwksClient = (args: Args): jwksRsa.JwksClient => {
    return new jwksRsa.JwksClient(args)
}
