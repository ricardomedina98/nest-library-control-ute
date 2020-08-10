import { Repository, EntityRepository } from "typeorm";
import { BookEntity } from "../entities/book.entity";
import { BookStatus } from "../types/book-status.enum";

@EntityRepository(BookEntity)
export class BookRepository extends Repository<BookEntity> {

    async existBookExceptById(id: number, title: string, edition: string): Promise<BookEntity> {
        return await this.createQueryBuilder('books')
        .where("books.title = :title AND books.edition = :edition AND books.status = :status AND books.id_book != :id", {
            id,
            title,
            edition,
            status: BookStatus.ACTIVE
        })
        .getOne();
    }

}