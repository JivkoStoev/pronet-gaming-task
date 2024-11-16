/* eslint-disable @typescript-eslint/no-empty-function */
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  const mockBooks: Book[] = [
    {
      isbn: '978-0553103540',
      name: 'A Game of Thrones',
      authors: ['George R. R. Martin'],
      numberOfPages: 694,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      released: '1996-08-01T00:00:00',
      characters: ['https://anapioficeandfire.com/api/characters/2'],
      povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
      id: 1,
      url: 'https://anapioficeandfire.com/api/book/1',
    },
    {
      isbn: '978-0553103541',
      name: 'A Clash of Kings',
      authors: ['George R. R. Martin'],
      numberOfPages: 768,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      released: '1998-11-16T00:00:00',
      characters: ['https://anapioficeandfire.com/api/characters/3'],
      povCharacters: ['https://anapioficeandfire.com/api/characters/149'],
      id: 2,
      url: 'https://anapioficeandfire.com/api/book/2',
    },
  ];

  const mockSingleBook: Book = {
    isbn: '978-0553103540',
    name: 'A Game of Thrones',
    authors: ['George R. R. Martin'],
    numberOfPages: 694,
    publisher: 'Bantam Books',
    country: 'United States',
    mediaType: 'Hardcover',
    released: '1996-08-01T00:00:00',
    characters: ['https://anapioficeandfire.com/api/characters/2'],
    povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
    id: 1,
    url: 'https://anapioficeandfire.com/api/book/1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBooks', () => {
    it('should return a list of books', () => {
      service.getBooks().subscribe((books) => {
        expect(books).toEqual(mockBooks);
      });

      const req = httpMock.expectOne('https://anapioficeandfire.com/api/books');
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);
    });

    it('should assign ids to books when no id is present in the API response', () => {
      service.getBooks().subscribe((books) => {
        expect(books).toEqual(mockBooks);
        expect(books[0].id).toBe(1);
        expect(books[1].id).toBe(2);
      });

      const req = httpMock.expectOne('https://anapioficeandfire.com/api/books');
      expect(req.request.method).toBe('GET');
      req.flush(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('should return a single book by ID', () => {
      const bookId = 1;
      service.getBookById(bookId).subscribe((book) => {
        expect(book).toEqual(mockSingleBook);
        expect(book.id).toBe(bookId);
      });

      const req = httpMock.expectOne(`https://anapioficeandfire.com/api/books/${bookId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSingleBook);
    });

    it('should include the book id when not present in the response', () => {
      const bookId = 1;
      service.getBookById(bookId).subscribe((book) => {
        expect(book).toEqual(mockSingleBook);
        expect(book.id).toBe(bookId);
      });

      const req = httpMock.expectOne(`https://anapioficeandfire.com/api/books/${bookId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockSingleBook);
    });
  });

  describe('Error handling', () => {
    it('should handle error when the API call fails', () => {
      const bookId = 1;
      const errorMessage = 'Book not found';

      service.getBookById(bookId).subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorMessage);
        },
      );

      const req = httpMock.expectOne(`https://anapioficeandfire.com/api/books/${bookId}`);
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
    });

    it('should handle error when fetching list of books fails', () => {
      const errorMessage = 'Failed to fetch books';

      service.getBooks().subscribe(
        () => {},
        (error) => {
          expect(error).toEqual(errorMessage);
        },
      );

      const req = httpMock.expectOne('https://anapioficeandfire.com/api/books');
      expect(req.request.method).toBe('GET');
      req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
