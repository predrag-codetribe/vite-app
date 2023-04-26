import { ObjectLiteral } from 'typeorm'
import { EntityTarget } from 'typeorm/common/EntityTarget'
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'

const MESSAGE_REGEX = /Could not find any entity of type "(.+)" matching: ((.|\n)+)/

/**
 * Accepts TypeOrm-s EntityNotFound error and returns entity name and conditions that were used
 */
export const getEntityNotFound = (err: Error): [string, string] => {
    const match = err.message.match(MESSAGE_REGEX)

    const entityType = match?.[1] ?? 'unknown-entity-type'
    const conditions = match?.[2] ?? 'unknown-conditions'

    return [ entityType, conditions ]
}
/**
 * Checks if entity exists, functionality which is missing from Typeorm.
 * Can be called to throw an error if entity exists, or if it doesn't exist.
 */
export const checkIfEntityExists = async <Entity extends ObjectLiteral>(t: TypeOrmEntityManager, args: {
    entity: EntityTarget<Entity>
    where: FindOptionsWhere<Entity>,
    throwIfExists: Error,
} | {
    entity: EntityTarget<Entity>
    where: FindOptionsWhere<Entity>,
    throwIfDoesntExist: Error,
}): Promise<void> => {

    const entity = await t.findOneBy(args.entity, args.where)

    if ('throwIfExists' in args && entity !== null)
        throw args.throwIfExists

    if ('throwIfDoesntExist' in args && entity === null)
        throw args.throwIfDoesntExist
}
