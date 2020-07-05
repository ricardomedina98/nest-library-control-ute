import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeNamesId1593836962173 implements MigrationInterface {
    name = 'ChangeNamesId1593836962173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `id` `id_user_details` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `users` CHANGE `id` `id_user` int NOT NULL AUTO_INCREMENT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` CHANGE `id_user` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `users_details` CHANGE `id_user_details` `id` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users` (`username`)");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users` (`email`)");
    }

}
