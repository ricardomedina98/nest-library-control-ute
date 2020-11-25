  
import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { UserEntity } from '../../modules/user/user.entity'
import { RoleEntity } from 'src/modules/role/entities/role.entity'
import { UserDetailsEntity } from 'src/modules/user/user.details.entity'

define(UserEntity, (faker: typeof Faker, context: { role: RoleEntity, password: string }) => {

    const user = new UserEntity();
    const userDetails = new UserDetailsEntity();

    userDetails.name = faker.name.firstName();
    userDetails.firstName = faker.name.firstName();
    userDetails.secondName = faker.name.lastName();
    user.username = faker.internet.userName(userDetails.firstName, userDetails.secondName);
    user.email = faker.internet.email(userDetails.firstName, userDetails.secondName);

    user.password = context.password;
    user.details = userDetails;
    user.role = context.role;
    return user;
})