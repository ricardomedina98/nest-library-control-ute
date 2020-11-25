  
import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { RoleEntity } from 'src/modules/role/entities/role.entity'

define(RoleEntity, (faker: typeof Faker, context: { name: string, description: string }) => {

    const role = new RoleEntity();
    role.name = context.name;
    role.description =  context.description;
    return role;

})