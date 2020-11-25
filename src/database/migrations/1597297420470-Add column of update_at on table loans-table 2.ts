import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnOfUpdateAtOnTableLoansTable21597297420470 implements MigrationInterface {
    name = 'AddColumnOfUpdateAtOnTableLoansTable21597297420470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `updated_at` `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
