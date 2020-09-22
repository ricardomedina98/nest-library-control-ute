import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnOfUpdateAtOnTableLoansTable41597297791476 implements MigrationInterface {
    name = 'AddColumnOfUpdateAtOnTableLoansTable41597297791476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `updated_at` `updated_at` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

}
