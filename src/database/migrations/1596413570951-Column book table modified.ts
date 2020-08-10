import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnBookTableModified1596413570951 implements MigrationInterface {
    name = 'ColumnBookTableModified1596413570951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `isbn`");
        await queryRunner.query("ALTER TABLE `books` ADD `isbn` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `isbn`");
        await queryRunner.query("ALTER TABLE `books` ADD `isbn` int NULL");
    }

}
