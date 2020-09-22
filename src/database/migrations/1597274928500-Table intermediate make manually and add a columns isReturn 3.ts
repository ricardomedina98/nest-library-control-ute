import {MigrationInterface, QueryRunner} from "typeorm";

export class TableIntermediateMakeManuallyAndAddAColumnsIsReturn31597274928500 implements MigrationInterface {
    name = 'TableIntermediateMakeManuallyAndAddAColumnsIsReturn31597274928500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` DROP FOREIGN KEY `FK_991f83a8e69389a64ef13f7543f`");
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `id_book` `id_book_loan` int NOT NULL");
        await queryRunner.query("ALTER TABLE `loans-books` ADD CONSTRAINT `FK_4ebb2768e4454a1bbf37d633f5e` FOREIGN KEY (`id_book_loan`) REFERENCES `books`(`id_book`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` DROP FOREIGN KEY `FK_4ebb2768e4454a1bbf37d633f5e`");
        await queryRunner.query("ALTER TABLE `loans-books` CHANGE `id_book_loan` `id_book` int NOT NULL");
        await queryRunner.query("ALTER TABLE `loans-books` ADD CONSTRAINT `FK_991f83a8e69389a64ef13f7543f` FOREIGN KEY (`id_book`) REFERENCES `books`(`id_book`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
