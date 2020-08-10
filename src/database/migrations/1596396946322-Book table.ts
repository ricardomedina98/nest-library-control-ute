import {MigrationInterface, QueryRunner} from "typeorm";

export class BookTable1596396946322 implements MigrationInterface {
    name = 'BookTable1596396946322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `book_categories` (`id_category` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id_category`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `book_lenguages` (`id_lenguage` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id_lenguage`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `books` (`id_book` int NOT NULL AUTO_INCREMENT, `title` text NOT NULL, `author1` text NOT NULL, `author2` text NULL, `omr` varchar(255) NOT NULL, `editorial` text NOT NULL, `collection` int NOT NULL, `edition` int NOT NULL, `quantity` int NOT NULL, `printed_place` text NOT NULL, `printed_year` text NOT NULL, `cost` float NULL, `can_borrow` tinyint NOT NULL, `notes` text NULL, `status` tinyint NOT NULL DEFAULT 1, `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id_lenguage` int NULL, PRIMARY KEY (`id_book`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `books_categories_book_categories` (`booksIdBook` int NOT NULL, `bookCategoriesIdCategory` int NOT NULL, INDEX `IDX_7ff2016c817af138992a1ead43` (`booksIdBook`), INDEX `IDX_b28dcf9f7709df092200483015` (`bookCategoriesIdCategory`), PRIMARY KEY (`booksIdBook`, `bookCategoriesIdCategory`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `books` ADD CONSTRAINT `FK_aad2ec1f9e4772fb1007b8acbde` FOREIGN KEY (`id_lenguage`) REFERENCES `book_lenguages`(`id_lenguage`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `books_categories_book_categories` ADD CONSTRAINT `FK_7ff2016c817af138992a1ead433` FOREIGN KEY (`booksIdBook`) REFERENCES `books`(`id_book`) ON DELETE CASCADE ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `books_categories_book_categories` ADD CONSTRAINT `FK_b28dcf9f7709df092200483015c` FOREIGN KEY (`bookCategoriesIdCategory`) REFERENCES `book_categories`(`id_category`) ON DELETE CASCADE ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `books_categories_book_categories` DROP FOREIGN KEY `FK_b28dcf9f7709df092200483015c`");
        await queryRunner.query("ALTER TABLE `books_categories_book_categories` DROP FOREIGN KEY `FK_7ff2016c817af138992a1ead433`");
        await queryRunner.query("ALTER TABLE `books` DROP FOREIGN KEY `FK_aad2ec1f9e4772fb1007b8acbde`");
        await queryRunner.query("DROP INDEX `IDX_b28dcf9f7709df092200483015` ON `books_categories_book_categories`");
        await queryRunner.query("DROP INDEX `IDX_7ff2016c817af138992a1ead43` ON `books_categories_book_categories`");
        await queryRunner.query("DROP TABLE `books_categories_book_categories`");
        await queryRunner.query("DROP TABLE `books`");
        await queryRunner.query("DROP TABLE `book_lenguages`");
        await queryRunner.query("DROP TABLE `book_categories`");
    }

}
