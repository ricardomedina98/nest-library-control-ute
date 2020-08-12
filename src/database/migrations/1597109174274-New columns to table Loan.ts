import {MigrationInterface, QueryRunner} from "typeorm";

export class NewColumnsToTableLoan1597109174274 implements MigrationInterface {
    name = 'NewColumnsToTableLoan1597109174274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans` ADD `reference` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans` DROP COLUMN `reference`");
    }

}
