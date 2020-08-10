import { Repository, EntityRepository } from "typeorm";
import { CategoryEntity } from "../entities/category.entity";

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {

    async existCategoryExceptById(id: number, name: string): Promise<CategoryEntity> {
        return await this.createQueryBuilder('book_categories')
        .where("book_categories.name = :name AND book_categories.id_category != :id", {
            id,
            name
        })
        .getOne();
    }

}