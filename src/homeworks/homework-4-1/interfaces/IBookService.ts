import IBook from './IBook';
import IAuthor from './IAuthor';

export default interface IBookService {
  getBooks: () => IBook[];
  getBookById: (bookId: number) => IBook;
  getAuthors: () => IAuthor[];
  getAuthorById: (authorId: number) => IAuthor;
  getBooksByAuthor: (authorSearchField: number | string) => IBook[];
  getAuthorByBookId: (bookId: number) => IAuthor | undefined;
  search: (search: string | number) => IBook[];
}
