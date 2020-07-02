import {MigrationInterface, QueryRunner} from "typeorm";

export class ColumnsDateChangedAndTriggerAdd1593663526233 implements MigrationInterface {
    name = 'ColumnsDateChangedAndTriggerAdd1593663526233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `updated_at` `updated_at` timestamp(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `created_at` `created_at` timestamp(0) NOT NULL");
    }

}
