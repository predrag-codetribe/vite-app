/* eslint-disable */
import * as fs from 'fs'

import { zodToJsonSchema } from 'zod-to-json-schema'

import { WebApiSpecification } from '../webApi/WebApiSpecification'
import { capitalize } from '../utils/StringsUtil'

export const webApiToOpenApi = (spec: WebApiSpecification) => {
    // openapi/swagger docs: https://spec.openapis.org/oas/v3.0.0
    const swg = {
        openapi: '3.0.0',
        info: {
            title: spec.name,
            version: spec.version,
        },
        servers: [{
            url: `http://localhost:${process.env.PORT}${spec.baseRoute}`,
            description: 'localhost',
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                },
            },
        },
        security: [{ bearerAuth: [] }],
        paths: spec.routers
            .map(router => {
                const container = {}
                for (const routeDefinition of router.routes) {
                    const [ method, rawRoute, usecase, _options ] = routeDefinition
                    let route = (router.baseRoute ?? '') + rawRoute
                    route = convertRouteToSwagger(route)

                    const pathArgs = extractArgsFromSwaggerRoute(route)

                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    const inputJsonSchema = zodToJsonSchema(usecase
                        .input
                        // remove path parameters from request bodies
                        .omit(pathArgs.reduce((acc, cur) => {
                            acc[cur] = true
                            return acc
                        }, {} as Record<string, true>)),
                         { target: 'openApi3' }
                    )
                    // @ts-expect-error TS2339: Property 'required' does not exist... yes it does exist
                    const inputRequiredArgs = inputJsonSchema.required as string[]

                    const outputJsonSchema = zodToJsonSchema(usecase.output, { target: 'openApi3' })

                    const apiName = getApiName(method, route)

                    // @ts-expect-error title does not exist in schema, but we want to add it
                    inputJsonSchema['title'] = apiName + 'Request'
                    // @ts-expect-error title does not exist in schema, but we want to add it
                    outputJsonSchema['title'] = apiName + 'Response'

                    // @ts-expect-error TS7053: Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
                    if (!container[route]) container[route] = {}

                    // @ts-expect-error type checking will be an additional feature here
                    container[route][method] = {
                        operationId: apiName,
                        description: '',
                        tags: [router.name],
                        parameters: [
                            // define path parameters
                            ...(pathArgs
                                ? pathArgs.map(pathArg => ({
                                    name: pathArg,
                                    in: 'path',
                                    description: pathArg,
                                    required: true, // all path args are required
                                    schema: {
                                        type: 'string', // all path args are strings
                                    },
                                }))
                                : []),
                            // query parameters
                            ...(method === 'get'
                                // @ts-expect-error properties does not exist
                                ? Object.entries(inputJsonSchema.properties)
                                    // @ts-expect-error TS2339: Property 'type' does not exist on type 'unknown'.
                                    .map(([ key, { type } ]) => ({
                                        name: key,
                                        in: 'query',
                                        description: key,
                                        required: inputRequiredArgs.includes(key),
                                        schema: {
                                            type,
                                            ...(type === 'array'
                                                ? {
                                                    items: {
                                                        type: 'string'
                                                    }
                                                }
                                                : {}
                                            )
                                        },
                                    }))
                                : []),
                        ],
                        requestBody: method !== 'get' ? {
                            required: true,
                            content: {
                                'application/json': {
                                    schema: inputJsonSchema,
                                },
                            },
                        } : undefined,
                        responses: {
                            '200': {
                                description: '',
                                content: {
                                    'application/json': {
                                        schema: outputJsonSchema,
                                    },
                                },
                            },
                        },
                    }
                }
                return container
            })
            .reduce((acc, curr) => {
                return { ...acc, ...curr }
            }, {}),
        tags: [
            ...spec.routers.map(router => ({
                name: router.name,
                description: router.name,
            })),
        ],
    }
    const final = JSON.stringify(swg, null, 2)
    fs.writeFileSync('openapi.json', final)
}

function convertRouteToSwagger(route: string): string {
    const pattern = /\/:(\w+)/g
    return route.replace(pattern, '/{$1}')
}

function extractArgsFromSwaggerRoute(route: string): string[] {
    const pattern = /{(\w+)}/g
    return route.match(pattern)?.map(param => param.slice(1, -1)) ?? []
}

// function extractKeysFromZodObject(input: ZodObject<ZodRawShape>): string[] {
//     return Object.keys(
//         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
//         zodToJsonSchema(input, { target: 'openApi3' })
//             // @ts-expect-error TS2339: Property 'properties' does not exist on type
//             .properties
//     )
// }

const REPLACE_REGEX = /[\/{}-]+/

function getApiName(method: string, route: string): string {
    method = method.replace('post', 'create')
    method = capitalize(method)
    route = route.split(REPLACE_REGEX).map(capitalize).join('')
    return method + route
}
