import { Seeder, Factory } from 'typeorm-seeding'
import { UserEntity } from '../../modules/user/user.entity';
import { RoleRepositry } from "../../modules/role/role.repository";
import { RoleEntity } from "../../modules/role/entities/role.entity";
import { Connection } from 'typeorm'
import { RoleType } from 'src/modules/role/types/role-type.enum';

export default class CreateUsers implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {

        const roles = Object.keys(RoleType);
        
        for (const role of roles) {
            await factory(RoleEntity)({ name: role, description: `Description of ${role}`}).create();
        }

        const roleMaster = await connection.getCustomRepository(RoleRepositry).findOne({ where: { name: RoleType.MASTER } });
        const roleAdmin = await connection.getCustomRepository(RoleRepositry).findOne({ where: { name: RoleType.ADMIN } });
        const roleStudent = await connection.getCustomRepository(RoleRepositry).findOne({ where: { name: RoleType.STUDENT } });

        
        await factory(UserEntity)({ role: roleMaster, password: "master" }).create({ username: "master" });  
        await factory(UserEntity)({ role: roleAdmin, password: "admin" }).create({ username: "admin" });  
        await factory(UserEntity)({ role: roleStudent, password: "student" }).create({ username: "student" });  
        
        await factory(UserEntity)({ role: roleMaster, password: "master" }).createMany(5);
        await factory(UserEntity)({ role: roleAdmin, password: "admin" }).createMany(5);
        await factory(UserEntity)({ role: roleStudent, password: "student" }).createMany(5);
         

    }
}