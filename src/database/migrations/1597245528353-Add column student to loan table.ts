import {MigrationInterface, QueryRunner} from "typeorm";

export class AddColumnStudentToLoanTable1597245528353 implements MigrationInterface {
    name = 'AddColumnStudentToLoanTable1597245528353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans` ADD `id_student` int NOT NULL");
        await queryRunner.query("ALTER TABLE `loans` ADD CONSTRAINT `FK_031fa2393676fd24ce533e6a112` FOREIGN KEY (`id_student`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `loans` DROP FOREIGN KEY `FK_031fa2393676fd24ce533e6a112`");
        await queryRunner.query("ALTER TABLE `loans` DROP COLUMN `id_student`");
    }

}
