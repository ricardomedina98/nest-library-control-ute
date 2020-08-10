import { BookEntity } from "../entities/book.entity";
import { BookDto } from "../dto/book/book.dto";

export const toDtoBook = (bookEntity: BookEntity) => {
    const { id_book, title, description, handle, author1, author2, omr, editorial, isbn, collection, edition, quantity, printed_place, printed_year, cost, can_borrow, notes, status, category, lenguage  } = bookEntity;


    let book: BookDto = {
        id_book, 
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
        status,
        category: {
            id_category: category.id_category,
            name: category.name
        },
        lenguage: {
            id_lenguage: lenguage.id_lenguage,
            name: lenguage.name
        }
    }

    return book;
}

export const toDtoBooks = (booksEntity: BookEntity[]) => {

    let books: BookDto[] = booksEntity.map(book => {

        return {
            id_book: book.id_book,
            title: book.title,
            description: book.description,
            handle: book.handle,
            author1: book.author1,
            author2: book.author2,
            omr: book.omr,
            editorial: book.editorial,
            isbn: book.isbn,
            collection: book.collection,
            edition: book.edition,
            quantity: book.quantity,
            printed_place: book.printed_place,
            printed_year: book.printed_year,
            cost: book.cost,
            can_borrow: book.can_borrow,
            notes: book.notes,
            status: book.status,
            category: {
                id_category: book.category.id_category,
                name: book.category.name
            },
            lenguage: {
                id_lenguage: book.lenguage.id_lenguage,
                name: book.lenguage.name
            }
        }
    });

    return books;
}
