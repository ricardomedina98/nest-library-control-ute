import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnBookTableAdded1596413497209 implements MigrationInterface {
    name = 'ColumnBookTableAdded1596413497209'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` ADD `isbn` int NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `isbn`");
    }

}
