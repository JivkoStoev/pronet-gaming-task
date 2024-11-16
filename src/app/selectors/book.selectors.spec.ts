import {
  selectBooksLoading,
  getBooksState,
  selectBooks,
  selectFilteredBooks,
} from './book.selectors';
import { BookState } from '../reducers/book.reducer';
import { Book } from '../books/models/book.model';

describe('Book Selectors', () => {
  const mockBooks: BookState = {
    ids: ['1', '2'],
    entities: {
      '1': {
        id: 1,
        url: 'https://anapioficeandfire.com/api/books/1',
        name: 'A Game of Thrones',
        isbn: '978-0553103540',
        authors: ['George R. R. Martin'],
        numberOfPages: 694,
        publisher: 'Bantam Books',
        country: 'United States',
        mediaType: 'Hardcover',
        released: '1996-08-01T00:00:00',
        characters: ['https://anapioficeandfire.com/api/characters/2'],
        povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
      },
      '2': {
        id: 2,
        url: 'https://anapioficeandfire.com/api/books/2',
        name: 'A Clash of Kings',
        isbn: '978-0553108033',
        authors: ['George R. R. Martin'],
        numberOfPages: 768,
        publisher: 'Bantam Books',
        country: 'United States',
        mediaType: 'Hardcover',
        released: '1998-11-16T00:00:00',
        characters: ['https://anapioficeandfire.com/api/characters/12'],
        povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
      },
    },
    filter: '',
    loading: false,
    error: undefined,
  };

  const emptyState: BookState = {
    ids: [],
    entities: {},
    filter: '',
    loading: false,
    error: undefined,
  };

  describe('getBooksState', () => {
    it('should return the BookState from the root state', () => {
      const rootState = { books: mockBooks };
      const result = getBooksState(rootState);
      expect(result).toEqual(mockBooks);
    });
  });

  describe('selectBooksLoading', () => {
    it('should return the loading state from BookState', () => {
      const result = selectBooksLoading.projector(mockBooks);
      expect(result).toBe(false);
    });

    it('should return true if loading is true', () => {
      const stateWithLoading: BookState = { ...mockBooks, loading: true };
      const result = selectBooksLoading.projector(stateWithLoading);
      expect(result).toBe(true);
    });
  });

  describe('selectBooks', () => {
    it('should return all books as an array', () => {
      const result = selectBooks.projector(mockBooks);

      const expectedBooks = Object.values(mockBooks.entities).filter(
        (book): book is Book => book !== undefined,
      );

      expect(result.length).toBe(2);
      expect(result).toEqual(expectedBooks);
    });

    it('should return an empty array if no books are present', () => {
      const result = selectBooks.projector(emptyState);
      expect(result).toEqual([]);
    });
  });

  describe('selectFilteredBooks', () => {
    it('should return filtered books based on the filter string', () => {
      const filter = 'A Game';
      const filteredBooks = selectFilteredBooks.projector(
        Object.values(mockBooks.entities).filter((book): book is Book => book !== undefined),
        filter,
      );

      expect(filteredBooks.length).toBe(1);
      expect(filteredBooks[0].name).toBe('A Game of Thrones');
    });

    it('should return all books if filter is empty', () => {
      const filter = '';
      const filteredBooks = selectFilteredBooks.projector(
        Object.values(mockBooks.entities).filter((book): book is Book => book !== undefined),
        filter,
      );

      expect(filteredBooks.length).toBe(2);
    });
  });
});
