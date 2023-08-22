import { z, ZodObject, ZodRawShape, ZodVoid } from 'zod'
import { UseCaseContext } from './UseCaseContext'

type InputType = ZodObject<ZodRawShape>
type OutputType = ZodObject<ZodRawShape> | ZodVoid

export type UseCase<Input extends InputType, Output extends OutputType> = Readonly<{
    input: Input

    output: Output

    /**
     * The main usecase function.
     * Omitting the second argument (t, as in transaction) will disable the automatic transaction.
     */
    execute: (ctx: UseCaseContext<z.infer<Input>>, t: TypeOrmEntityManager) => Promise<z.infer<Output>>
}>

export const createUseCase = <I extends InputType, O extends OutputType>(useCase: UseCase<I, O>): UseCase<I, O> =>
    useCase
