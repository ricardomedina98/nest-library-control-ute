import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from '../repositories/category.repository';
import { toDtoCategory, toDtoCategories } from '../mapper/category.mapper';
import { CreateCategoryDto } from '../dto/category/create-category.dto';
import { CategoryEntity } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/category/update-category.dto';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(CategoryRepository)
        private readonly _categoryRepository: CategoryRepository
    ) {}

    async getAllCategories() {
        
        const categories = await this._categoryRepository.find();

        return toDtoCategories(categories);
    }

    async getOneCategory(id: number) {

        const category = await this._categoryRepository.findOne(id);

        if(!category) {
            throw new NotFoundException('Categoy does not exist');
        }

        return toDtoCategory(category);

    }

    async createCategory(createCategoryDto: CreateCategoryDto) {

        const { name } = createCategoryDto;

        const existCategory = await this._categoryRepository.findOne({
            where: {
                name
            }
        });

        if(existCategory) {
            throw new ConflictException('Category al ready exist');
        }

        let category: CategoryEntity = this._categoryRepository.create({
            name
        });

        category = await this._categoryRepository.save(category);

        return toDtoCategory(category);

    }

    async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {

        const { name } = updateCategoryDto;

        const existCategory = await this._categoryRepository.findOne(id);

        if(!existCategory) {
            throw new ConflictException('Category does not exist');
        }

        const existCategoryName = await this._categoryRepository.existCategoryExceptById(id, name);

        if(existCategoryName) {
            throw new ConflictException('Category already exist');
        }

        let category: CategoryEntity = this._categoryRepository.merge(existCategory, {
            name
        });

        category = await this._categoryRepository.save(category);

        return toDtoCategory(category);

    }


}
