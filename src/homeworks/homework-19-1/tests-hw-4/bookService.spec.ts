import IBookService from '../../homework-4-1/interfaces/IBookService';
import { BookService } from '../../homework-4-1/bookService';

describe('BookService', () => {
  let bookService: IBookService;

  const testBooksLength = 10;
  const testAuthorsLength = 5;
  const testAuthorId = 1;
  const testBookId = 1;
  const testAuthorBooksLength = 3;
  const testAuthorName = 'Rowling';
  const testBooksBySearchLength = 2;
  const testSearch = 1954;
  const testWrongBookId = 100;
  const testWrongAuthorId = 1000;

  beforeEach(() => {
    bookService = new BookService();
  });

  it('should be instance of BookService', () => {
    expect(bookService).toBeInstanceOf(BookService);
  });

  it('should return all books', () => {
    const books = bookService.getBooks();
    expect(books.length).toBe(testBooksLength);
  });

  it('should return a book by ID', () => {
    const book = bookService.getBookById(testBookId);
    expect(book.id).toBe(testBookId);
  });

  it('should return all authors', () => {
    const authors = bookService.getAuthors();
    expect(authors.length).toBe(testAuthorsLength);
  });

  it('should return an author by ID', () => {
    const author = bookService.getAuthorById(testAuthorId);
    expect(author.id).toBe(testAuthorId);
  });

  it('should return books by author ID', () => {
    const books = bookService.getBooksByAuthor(testAuthorId);
    expect(books.length).toBe(testAuthorBooksLength);
  });

  it('should return books by author name', () => {
    const books = bookService.getBooksByAuthor(testAuthorName);
    expect(books.length).toBe(testAuthorBooksLength);
  });

  it('should return author by book ID', () => {
    const author = bookService.getAuthorByBookId(testBookId);
    expect(author?.id).toBe(testAuthorId);
  });

  it('should return books by search', () => {
    const books = bookService.search(testSearch);
    expect(books.length).toBe(testBooksBySearchLength);
  });

  it('should throw an error if book not found by ID', () => {
    expect(() => bookService.getBookById(testWrongBookId)).toThrow('Book not found');
  });

  it('should throw an error if author not found by ID', () => {
    expect(() => bookService.getAuthorById(testWrongAuthorId)).toThrow('Author not found');
  });
});
