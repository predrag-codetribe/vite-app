const { MigrationInterface, QueryRunner } = require('typeorm')

module.exports = class Inti1692718484377 {
    async up(queryRunner) {
        await queryRunner.query(
            `
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

            CREATE TABLE "test" (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                content JSONB NOT NULL
            );
        `)
    }

    async down(queryRunner) {
        await queryRunner.query(
            'DROP TABLE "test";',
        )
    }

}

