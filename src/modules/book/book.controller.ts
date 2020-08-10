import { Controller, Get, Post, UsePipes, ValidationPipe, Param, ParseIntPipe, Body, Put, Delete } from '@nestjs/common';
import { BookService } from './services/book.service';
import { CreateBookDto } from './dto/book/create-book.dto';
import { CreateLenguageDto } from './dto/lenguage/create-lenguage.dto';
import { LenguageService } from './services/lenguage.service';
import { UpdateLenguageDto } from './dto/lenguage/update-lenguage.dto';
import { CategoryService } from './services/category.service';
import { CreateCategoryDto } from './dto/category/create-category.dto';
import { UpdateCategoryDto } from './dto/category/update-category.dto';
import { UpdateBookDto } from './dto/book/update-book.dto';

@Controller('book')
@UsePipes(ValidationPipe)
export class BookController {

    constructor(
        private readonly _bookService: BookService,
        private readonly _lenguageService: LenguageService,
        private readonly _categoryService: CategoryService
    ) {}

    //Lenguage

    @Get('lenguage')
    async getAllLenguages() {
        return await this._lenguageService.getAllLenguages();
    }

    @Get('lenguage/:id')
    async getOneLenguage(@Param('id', ParseIntPipe) id: number) {
        return await this._lenguageService.getOneLenguage(id);
    }

    @Post('lenguage')
    async createLenguage(@Body() createLenguageDto: CreateLenguageDto) {
        return await this._lenguageService.createLenguage(createLenguageDto);
    }

    @Put('lenguage/:id')
    async updateLenguage(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateLenguageDto: UpdateLenguageDto
    ) {
        return await this._lenguageService.updateLenguage(id, updateLenguageDto);
    }



    //Category

    @Get('category')
    async getAllCategories() {
        return await this._categoryService.getAllCategories();
    }

    @Get('category/:id')
    async getOneCaregory(@Param('id', ParseIntPipe) id: number) {
        return await this._categoryService.getOneCategory(id);
    }

    @Post('category')
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this._categoryService.createCategory(createCategoryDto);
    }

    @Put('category/:id')
    async updateCategory(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateCategoryDto: UpdateCategoryDto
    ) {
        return await this._categoryService.updateCategory(id, updateCategoryDto);
    }


    //Book

    @Get()
    async getAllBooks() {
        return await this._bookService.getAllBooks();
    }

    @Get(':id')
    async getBook(@Param('id', ParseIntPipe) id: number) {
        return await this._bookService.getOneBook(id);
    }

    @Post()
    async createBook(@Body() createBookDto: CreateBookDto) {
        return await this._bookService.createBook(createBookDto);
    }

    @Put(':id')
    async updateBook(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateBookDto: UpdateBookDto
    ) {
        return this._bookService.updateBook(id, updateBookDto);
    }

    @Delete(':id')
    async deleteBook(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this._bookService.deleteBook(id);
    }
}
