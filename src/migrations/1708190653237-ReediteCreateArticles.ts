import {MigrationInterface, QueryRunner} from "typeorm";

export class ReediteCreateArticles1708190653237 implements MigrationInterface {
    name = 'ReediteCreateArticles1708190653237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "updateddAt" TO "updatedAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "articles" RENAME COLUMN "updatedAt" TO "updateddAt"`);
    }

}
