import {MigrationInterface, QueryRunner} from "typeorm";

export class fixNullDataOnUserDetails1595104898920 implements MigrationInterface {
    name = 'fixNullDataOnUserDetails1595104898920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `enrollment` `enrollment` varchar(50) NULL");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `first_name` `first_name` varchar(255) NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `first_name` `first_name` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `enrollment` `enrollment` varchar(50) NOT NULL");
    }

}
