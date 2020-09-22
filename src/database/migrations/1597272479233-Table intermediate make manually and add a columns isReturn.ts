import {MigrationInterface, QueryRunner} from "typeorm";

export class TableIntermediateMakeManuallyAndAddAColumnsIsReturn1597272479233 implements MigrationInterface {
    name = 'TableIntermediateMakeManuallyAndAddAColumnsIsReturn1597272479233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `loans-books` (`is_return` tinyint NOT NULL DEFAULT 0, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id_loan` int NOT NULL, `id_book` int NOT NULL, PRIMARY KEY (`id_loan`, `id_book`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `loans-books` ADD CONSTRAINT `FK_aa85bf635cb7abecc2858cfc0b2` FOREIGN KEY (`id_loan`) REFERENCES `loans`(`id_loan`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans-books` ADD CONSTRAINT `FK_991f83a8e69389a64ef13f7543f` FOREIGN KEY (`id_book`) REFERENCES `books`(`id_book`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans-books` DROP FOREIGN KEY `FK_991f83a8e69389a64ef13f7543f`");
        await queryRunner.query("ALTER TABLE `loans-books` DROP FOREIGN KEY `FK_aa85bf635cb7abecc2858cfc0b2`");
        await queryRunner.query("DROP TABLE `loans-books`");
    }

}
