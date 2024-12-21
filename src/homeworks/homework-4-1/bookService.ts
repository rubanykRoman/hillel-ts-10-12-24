import IAuthor from './interfaces/IAuthor';
import IBook from './interfaces/IBook';
import IBookService from './interfaces/IBookService';

class BookService implements IBookService {
  private authors: IAuthor[] = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George Orwell' },
    { id: 3, name: 'J.R.R. Tolkien' },
    { id: 4, name: 'Harper Lee' },
    { id: 5, name: 'F. Scott Fitzgerald' },
  ];

  private books: IBook[] = [
    {
      id: 1,
      title: "Harry Potter and the Sorcerer's Stone",
      genre: 'Fantasy',
      publicationYear: 1997,
      author: this.authors[0],
    },
    { id: 2, title: '1984', genre: 'Dystopian', publicationYear: 1949, author: this.authors[1] },
    {
      id: 3,
      title: 'Animal Farm',
      genre: 'Political Satire',
      publicationYear: 1945,
      author: this.authors[1],
    },
    {
      id: 4,
      title: 'The Hobbit',
      genre: 'Fantasy',
      publicationYear: 1937,
      author: this.authors[2],
    },
    {
      id: 5,
      title: 'To Kill a Mockingbird',
      genre: 'Fiction',
      publicationYear: 1960,
      author: this.authors[3],
    },
    {
      id: 6,
      title: 'The Great Gatsby',
      genre: 'Tragedy',
      publicationYear: 1925,
      author: this.authors[4],
    },
    {
      id: 7,
      title: 'Harry Potter and the Chamber of Secrets',
      genre: 'Fantasy',
      publicationYear: 1998,
      author: this.authors[0],
    },
    {
      id: 8,
      title: 'Harry Potter and the Prisoner of Azkaban',
      genre: 'Fantasy',
      publicationYear: 1999,
      author: this.authors[0],
    },
    {
      id: 9,
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      genre: 'Fantasy',
      publicationYear: 1954,
      author: this.authors[2],
    },
    {
      id: 10,
      title: 'The Lord of the Rings: The Two Towers',
      genre: 'Fantasy',
      publicationYear: 1954,
      author: this.authors[2],
    },
  ];

  getBooks(): IBook[] {
    return this.books;
  }

  getBookById(bookId: number): IBook {
    const book = this.books.find((b) => b.id === bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  getAuthors(): IAuthor[] {
    return this.authors;
  }

  getAuthorById(authorId: number): IAuthor {
    const author = this.authors.find((a) => a.id === authorId);
    if (!author) {
      throw new Error('Author not found');
    }
    return author;
  }

  getBooksByAuthor(authorSearchField: number | string): IBook[] {
    let filteredBooks: IBook[];
    if (typeof authorSearchField === 'number') {
      filteredBooks = this.books.filter((b) => b.author.id === authorSearchField);
    } else {
      filteredBooks = this.books.filter((b) => b.author.name.includes(authorSearchField));
    }

    if (filteredBooks.length === 0) {
      throw new Error('No books found for the given author');
    }

    return filteredBooks;
  }

  getAuthorByBookId(bookId: number): IAuthor {
    const book = this.books.find((b) => b.id === bookId);
    if (!book) {
      throw new Error('Book not found for the given ID');
    }
    return book.author;
  }

  search(search: string | number): IBook[] {
    let filteredBooks: IBook[];

    if (typeof search === 'number') {
      filteredBooks = this.books.filter(
        (book) => book.publicationYear === search || book.id === search || book.author.id === search
      );
    } else {
      filteredBooks = this.books.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.genre.toLowerCase().includes(search.toLowerCase()) ||
          book.author.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (filteredBooks.length === 0) {
      throw new Error('No results found for the given search criteria');
    }

    return filteredBooks;
  }
}

const bookService = new BookService();

console.log('All Books:', bookService.getBooks());
console.log('Book by ID (1):', bookService.getBookById(1));
console.log('All Authors:', bookService.getAuthors());
console.log('Author by ID (2):', bookService.getAuthorById(2));
console.log('Books by Author ID (1):', bookService.getBooksByAuthor(1));
console.log("Books by Author Name ('J.K. Rowling'):", bookService.getBooksByAuthor('J.K. Rowling'));
console.log('Author by Book ID (3):', bookService.getAuthorByBookId(3));
console.log("Search for 'Fantasy':", bookService.search('Fantasy'));
console.log('Search for 1954:', bookService.search(1954));
console.log('Search for 2:', bookService.search(2));
