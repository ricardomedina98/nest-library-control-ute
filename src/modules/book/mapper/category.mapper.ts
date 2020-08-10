import { CategoryEntity } from "../entities/category.entity";
import { CategoryDto } from "../dto/category/category.dto";

export const toDtoCategory = (categoryEntity: CategoryEntity) => {

    const { id_category, name } = categoryEntity;

    const category: CategoryDto = {
        id_category,
        name
    }

    return category;

}


export const toDtoCategories = (categoriesEntity: CategoryEntity[]) => {

    if(!categoriesEntity) return categoriesEntity = [];

    const categories: CategoryDto[] = categoriesEntity.map(category => {
        return {
            id_category: category.id_category,
            name: category.name
        }
    });

    return categories;
}