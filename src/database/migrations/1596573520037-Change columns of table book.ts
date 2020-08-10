import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnsOfTableBook1596573520037 implements MigrationInterface {
    name = 'ChangeColumnsOfTableBook1596573520037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `collection`");
        await queryRunner.query("ALTER TABLE `books` ADD `collection` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `edition`");
        await queryRunner.query("ALTER TABLE `books` ADD `edition` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `edition`");
        await queryRunner.query("ALTER TABLE `books` ADD `edition` int NULL");
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `collection`");
        await queryRunner.query("ALTER TABLE `books` ADD `collection` int NULL");
    }

}
