import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeColumnKeyOfStatusToNULL1597264574483 implements MigrationInterface {
    name = 'ChangeColumnKeyOfStatusToNULL1597264574483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `status-loan` CHANGE `key` `key` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `status-loan` CHANGE `key` `key` varchar(255) NOT NULL");
    }

}
