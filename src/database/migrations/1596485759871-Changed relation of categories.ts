import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangedRelationOfCategories1596485759871 implements MigrationInterface {
    name = 'ChangedRelationOfCategories1596485759871'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` ADD `description` text NULL");
        await queryRunner.query("ALTER TABLE `books` ADD `handle` text NOT NULL");
        await queryRunner.query("ALTER TABLE `books` ADD `id_category` int NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `omr` `omr` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `isbn` `isbn` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `collection` `collection` int NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `edition` `edition` int NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `printed_place` `printed_place` text NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `printed_year` `printed_year` text NULL");
        await queryRunner.query("ALTER TABLE `books` ADD CONSTRAINT `FK_bf1a025bd0eda4731b82e9a4dce` FOREIGN KEY (`id_category`) REFERENCES `book_categories`(`id_category`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books` DROP FOREIGN KEY `FK_bf1a025bd0eda4731b82e9a4dce`");
        await queryRunner.query("ALTER TABLE `books` CHANGE `printed_year` `printed_year` text NOT NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `printed_place` `printed_place` text NOT NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `edition` `edition` int NOT NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `collection` `collection` int NOT NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `isbn` `isbn` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `books` CHANGE `omr` `omr` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `id_category`");
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `handle`");
        await queryRunner.query("ALTER TABLE `books` DROP COLUMN `description`");
    }

}
