import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1594248015655 implements MigrationInterface {
    name = 'firstMigration1594248015655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `roles` (`id_role` int NOT NULL AUTO_INCREMENT, `name` varchar(20) NOT NULL, `description` text NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id_role`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_details` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `first_name` varchar(255) NULL, `second_name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `status` varchar(8) NOT NULL DEFAULT 'ACTIVE', `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `id_details` int NOT NULL, `id_role` int NOT NULL, UNIQUE INDEX `REL_7780155fc24b5d19a5d1336aca` (`id_details`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_7780155fc24b5d19a5d1336aca0` FOREIGN KEY (`id_details`) REFERENCES `users_details`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_f8a3754f51a266a160e71d261f8` FOREIGN KEY (`id_role`) REFERENCES `roles`(`id_role`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_f8a3754f51a266a160e71d261f8`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_7780155fc24b5d19a5d1336aca0`");
        await queryRunner.query("DROP INDEX `REL_7780155fc24b5d19a5d1336aca` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `users_details`");
        await queryRunner.query("DROP TABLE `roles`");
    }

}
