import { CategoryEntity } from "src/modules/book/entities/category.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { categories } from "../data/categories";

export default class CreateCategories implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<void> {
        
        for(const category of categories){
            await factory(CategoryEntity)({name: category}).create();
        }

    }

}