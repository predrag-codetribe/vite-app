import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { z } from 'zod'

const contentSchema = z.object({
    title: z.string(),
    description: z.string(),
})

type Content = z.infer<typeof contentSchema>

@Entity()
export class Test {
    constructor(args?: Pick<Test, 'content'>) {
        if (!args) return
        this.content = args.content
    }

    @PrimaryGeneratedColumn('uuid')
    readonly id: string

    @Column({ type: 'jsonb', nullable: false })
    readonly content: Content
}
