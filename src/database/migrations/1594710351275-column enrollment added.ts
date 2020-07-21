import {MigrationInterface, QueryRunner} from "typeorm";

export class columnEnrollmentAdded1594710351275 implements MigrationInterface {
    name = 'columnEnrollmentAdded1594710351275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_details` ADD `enrollment` varchar(50) NOT NULL");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `second_name` `second_name` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `second_name` `second_name` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users_details` DROP COLUMN `enrollment`");
    }

}
