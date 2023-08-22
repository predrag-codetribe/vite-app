import { webApi } from './framework/webApi/WebApi'
import { getTest } from './app/usecases/getTest'

export const runWebApp = () => {
    webApi({
        name: 'SpvGovernanceAPI',
        baseRoute: (process.env.API_BASE_ROUTE || '/api'),
        version: '0.0.1',
        routers: [
            {
                name: 'PublicRouter',
                middleware: [],
                routes: [
                    [ 'get', '/test/:id', getTest ],
                ],
            },
        ],
    })
}
