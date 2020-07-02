import {MigrationInterface, QueryRunner} from "typeorm";

export class addUsername1593637199564 implements MigrationInterface {
    name = 'addUsername1593637199564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` ADD `username` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`)");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `first_name` `first_name` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `first_name` `first_name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` DROP INDEX `IDX_fe0bb3f6520ee0469504521e71`");
        await queryRunner.query("ALTER TABLE `users` DROP COLUMN `username`");
    }

}
