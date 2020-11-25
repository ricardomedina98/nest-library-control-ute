  
import Faker from 'faker'
import { define } from 'typeorm-seeding'
import { RoleEntity } from 'src/modules/role/entities/role.entity'
import { CategoryEntity } from 'src/modules/book/entities/category.entity';

define(CategoryEntity, (faker: typeof Faker, context: { name: string, description: string }) => {

    const category = new CategoryEntity();
    category.name = context.name;
    return category;

})