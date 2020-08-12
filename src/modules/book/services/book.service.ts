import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BookRepository } from '../repositories/book.repository';
import { BookStatus } from '../types/book-status.enum';
import { toDtoBooks, toDtoBook } from '../mapper/book.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDto } from '../dto/book/book.dto';
import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from '../dto/book/create-book.dto';
import { of } from 'rxjs';
import { CategoryRepository } from '../repositories/category.repository';
import { LenguageRepository } from '../repositories/lenguage.repository';
import { UpdateBookDto } from '../dto/book/update-book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(BookRepository)
        private readonly _bookRepository: BookRepository,
        @InjectRepository(CategoryRepository)
        private readonly _categoryRepository: CategoryRepository,
        @InjectRepository(LenguageRepository)
        private readonly _lenguageRepository: LenguageRepository
    ) {}

    async getAllBooks(): Promise<BookDto[]> {

        const books = await this._bookRepository.find({
            where: {
                status: BookStatus.ACTIVE
            }
        });

        return books.map(book => toDtoBook(book));;
        
    }

    async getOneBook(id: number): Promise<BookDto> {

        const book = await this._bookRepository.findOne(id);

        if(!book) {
            throw new NotFoundException('Book does not exist');
        }

        return toDtoBook(book);
    }

    async createBook(createBook: CreateBookDto) {

        const {
            title,
            description,
            handle,
            author1,
            author2,
            omr,
            editorial,
            isbn,
            collection,
            edition,
            quantity,
            printed_place,
            printed_year,
            cost,
            can_borrow,
            notes,
            category,
            lenguage,
            
        } = createBook;

        const existBook = await this._bookRepository.findOne({
            where: {
                title,
                edition,
                status: BookStatus.ACTIVE
            }
        });

        if(existBook) {
            throw new ConflictException('Book already exist');
        }

        const existCategory = await this._categoryRepository.findOne(category);

        if(!existCategory) {
            throw new NotFoundException('Category does not exist');
        }

        const existLenguage = await this._lenguageRepository.findOne(lenguage);

        if(!existLenguage) {
            throw new NotFoundException('Lenguage does not exist');
        }

        let book: BookEntity = this._bookRepository.create({
            title,
            description,
            handle,
            author1,
            author2,
            omr,
            editorial,
            isbn,
            collection,
            edition,
            quantity,
            printed_place,
            printed_year,
            cost,
            can_borrow,
            notes,
            category : existCategory,
            lenguage : existLenguage,
        });

        book = await this._bookRepository.save(book);

        return toDtoBook(book);
    }

    async updateBook(id: number, updateBookDto: UpdateBookDto) {

        const {
            title,
            description,
            handle,
            author1,
            author2,
            omr,
            editorial,
            isbn,
            collection,
            edition,
            quantity,
            printed_place,
            printed_year,
            cost,
            can_borrow,
            notes,
            category,
            lenguage,
            
        } = updateBookDto;

        const existBook = await this._bookRepository.findOne(id);

        if(!existBook) {
            throw new NotFoundException('Book does not exist');
        }

        const existBookTitle = await this._bookRepository.existBookExceptById(id, title, edition);

        if(existBookTitle) {
            throw new ConflictException('Book title and edition already exist');
        }

        const existCategory = await this._categoryRepository.findOne(category);

        if(!existCategory) {
            throw new NotFoundException('Category does not exist');
        }

        const existLenguage = await this._lenguageRepository.findOne(lenguage);

        if(!existLenguage) {
            throw new NotFoundException('Lenguage does not exist');
        }

        let book: BookEntity = this._bookRepository.merge(existBook, {
            title,
            description,
            handle,
            author1,
            author2,
            omr,
            editorial,
            isbn,
            collection,
            edition,
            quantity,
            printed_place,
            printed_year,
            cost,
            can_borrow,
            notes,
            category: existCategory,
            lenguage: existLenguage
        });

        book = await this._bookRepository.save(book);

        return toDtoBook(book);

    }

    async deleteBook(id: number) {
        const existBook = await this._bookRepository.findOne(id);

        if(!existBook) {
            throw new NotFoundException('Book does not exist');
        }

        let book = this._bookRepository.merge(existBook, {
            status: false
        })

        book = await this._bookRepository.save(book);

        return toDtoBook(book);
    }

    

}
