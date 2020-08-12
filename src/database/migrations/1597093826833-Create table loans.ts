import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableLoans1597093826833 implements MigrationInterface {
    name = 'CreateTableLoans1597093826833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `status-loan` (`id_status` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id_status`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans-statuses` (`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id_loan` int NOT NULL, `id_status` int NOT NULL, PRIMARY KEY (`id_loan`, `id_status`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans` (`id_loan` int NOT NULL AUTO_INCREMENT, `start_date` date NOT NULL, `end_date` date NOT NULL, `notes` text NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id_user` int NOT NULL, PRIMARY KEY (`id_loan`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans_books_books` (`loansIdLoan` int NOT NULL, `booksIdBook` int NOT NULL, INDEX `IDX_97c2b17c9c95f7bb69d659c68f` (`loansIdLoan`), INDEX `IDX_8214938df81734c23926b4fdf4` (`booksIdBook`), PRIMARY KEY (`loansIdLoan`, `booksIdBook`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `loans-statuses` ADD CONSTRAINT `FK_a5ce3d2936a75bbacb283a2f2a3` FOREIGN KEY (`id_loan`) REFERENCES `loans`(`id_loan`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans-statuses` ADD CONSTRAINT `FK_cb712284524f50f4fc5223489d8` FOREIGN KEY (`id_status`) REFERENCES `status-loan`(`id_status`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans` ADD CONSTRAINT `FK_1c2c4501ac108a5c21981d1f306` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans_books_books` ADD CONSTRAINT `FK_97c2b17c9c95f7bb69d659c68f5` FOREIGN KEY (`loansIdLoan`) REFERENCES `loans`(`id_loan`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans_books_books` ADD CONSTRAINT `FK_8214938df81734c23926b4fdf42` FOREIGN KEY (`booksIdBook`) REFERENCES `books`(`id_book`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans_books_books` DROP FOREIGN KEY `FK_8214938df81734c23926b4fdf42`");
        await queryRunner.query("ALTER TABLE `loans_books_books` DROP FOREIGN KEY `FK_97c2b17c9c95f7bb69d659c68f5`");
        await queryRunner.query("ALTER TABLE `loans` DROP FOREIGN KEY `FK_1c2c4501ac108a5c21981d1f306`");
        await queryRunner.query("ALTER TABLE `loans-statuses` DROP FOREIGN KEY `FK_cb712284524f50f4fc5223489d8`");
        await queryRunner.query("ALTER TABLE `loans-statuses` DROP FOREIGN KEY `FK_a5ce3d2936a75bbacb283a2f2a3`");
        await queryRunner.query("DROP INDEX `IDX_8214938df81734c23926b4fdf4` ON `loans_books_books`");
        await queryRunner.query("DROP INDEX `IDX_97c2b17c9c95f7bb69d659c68f` ON `loans_books_books`");
        await queryRunner.query("DROP TABLE `loans_books_books`");
        await queryRunner.query("DROP TABLE `loans`");
        await queryRunner.query("DROP TABLE `loans-statuses`");
        await queryRunner.query("DROP TABLE `status-loan`");
    }

}
