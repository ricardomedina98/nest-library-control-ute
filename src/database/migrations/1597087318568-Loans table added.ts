import {MigrationInterface, QueryRunner} from "typeorm";

export class LoansTableAdded1597087318568 implements MigrationInterface {
    name = 'LoansTableAdded1597087318568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `status-loan` (`id_status` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id_status`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans` (`id_loan` int NOT NULL AUTO_INCREMENT, `start_date` date NOT NULL, `end_date` date NOT NULL, `notes` text NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id_loan`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans_book_books` (`loansIdLoan` int NOT NULL, `booksIdBook` int NOT NULL, INDEX `IDX_4cedd99ee183d9be2a36a826f1` (`loansIdLoan`), INDEX `IDX_ca7392bc746e353bd908a0fdf6` (`booksIdBook`), PRIMARY KEY (`loansIdLoan`, `booksIdBook`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `loans_status_status-loan` (`loansIdLoan` int NOT NULL, `statusLoanIdStatus` int NOT NULL, INDEX `IDX_3a70fd327b77600ff7e1228bdc` (`loansIdLoan`), INDEX `IDX_878c29fb1189ccdc39f7410b99` (`statusLoanIdStatus`), PRIMARY KEY (`loansIdLoan`, `statusLoanIdStatus`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `loans_book_books` ADD CONSTRAINT `FK_4cedd99ee183d9be2a36a826f15` FOREIGN KEY (`loansIdLoan`) REFERENCES `loans`(`id_loan`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans_book_books` ADD CONSTRAINT `FK_ca7392bc746e353bd908a0fdf66` FOREIGN KEY (`booksIdBook`) REFERENCES `books`(`id_book`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans_status_status-loan` ADD CONSTRAINT `FK_3a70fd327b77600ff7e1228bdc3` FOREIGN KEY (`loansIdLoan`) REFERENCES `loans`(`id_loan`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `loans_status_status-loan` ADD CONSTRAINT `FK_878c29fb1189ccdc39f7410b990` FOREIGN KEY (`statusLoanIdStatus`) REFERENCES `status-loan`(`id_status`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans_status_status-loan` DROP FOREIGN KEY `FK_878c29fb1189ccdc39f7410b990`");
        await queryRunner.query("ALTER TABLE `loans_status_status-loan` DROP FOREIGN KEY `FK_3a70fd327b77600ff7e1228bdc3`");
        await queryRunner.query("ALTER TABLE `loans_book_books` DROP FOREIGN KEY `FK_ca7392bc746e353bd908a0fdf66`");
        await queryRunner.query("ALTER TABLE `loans_book_books` DROP FOREIGN KEY `FK_4cedd99ee183d9be2a36a826f15`");
        await queryRunner.query("DROP INDEX `IDX_878c29fb1189ccdc39f7410b99` ON `loans_status_status-loan`");
        await queryRunner.query("DROP INDEX `IDX_3a70fd327b77600ff7e1228bdc` ON `loans_status_status-loan`");
        await queryRunner.query("DROP TABLE `loans_status_status-loan`");
        await queryRunner.query("DROP INDEX `IDX_ca7392bc746e353bd908a0fdf6` ON `loans_book_books`");
        await queryRunner.query("DROP INDEX `IDX_4cedd99ee183d9be2a36a826f1` ON `loans_book_books`");
        await queryRunner.query("DROP TABLE `loans_book_books`");
        await queryRunner.query("DROP TABLE `loans`");
        await queryRunner.query("DROP TABLE `status-loan`");
    }

}
