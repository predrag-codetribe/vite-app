import { MigrationInterface, QueryRunner } from 'typeorm'

export class Hello1685014271575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE "test" (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                content JSONB NOT NULL
            );
            `,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'DROP TABLE "test";',
        )
    }

}
