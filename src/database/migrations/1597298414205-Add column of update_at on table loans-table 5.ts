import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnOfUpdateAtOnTableLoansTable51597298414205 implements MigrationInterface {
    name = 'AddColumnOfUpdateAtOnTableLoansTable51597298414205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` DROP COLUMN `updated_at`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` ADD `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
