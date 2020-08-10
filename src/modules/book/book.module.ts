import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './repositories/book.repository';
import { LenguageRepository } from './repositories/lenguage.repository';
import { CategoryRepository } from './repositories/category.repository';
import { BookService } from './services/book.service';
import { LenguageService } from './services/lenguage.service';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, LenguageRepository, CategoryRepository])],
  controllers: [BookController],
  providers: [BookService, LenguageService, CategoryService]
})
export class BookModule {}
