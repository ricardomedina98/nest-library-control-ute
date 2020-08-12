import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnKeyToStatusTable1597242939903 implements MigrationInterface {
    name = 'AddColumnKeyToStatusTable1597242939903'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `status-loan` ADD `key` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `status-loan` DROP COLUMN `key`");
    }

}
