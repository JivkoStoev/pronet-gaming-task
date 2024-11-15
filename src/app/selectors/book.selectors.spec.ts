import { selectBooksLoading, getBooksState } from './book.selectors';
import { BookState } from '../reducers/book.reducer';

describe('Book Selectors', () => {
  describe('getBooksState', () => {
    it('should return the BookState from the root state', () => {
      const mockState: BookState = {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1' },
          '2': { id: '2' },
        },
        loading: false,
        error: undefined,
      };

      // Call the selector and check if it returns the state correctly
      const result = getBooksState(mockState);

      expect(result).toEqual(mockState);
    });
  });

  describe('selectBooksLoading', () => {
    it('should select the loading state from the BookState', () => {
      const mockState: BookState = {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1' },
          '2': { id: '2' },
        },
        loading: true,
        error: undefined,
      };

      // Use the selector to get the loading state
      const result = selectBooksLoading.projector(mockState);

      expect(result).toBe(true);
    });

    it('should return false when loading is false', () => {
      const mockState: BookState = {
        ids: ['1', '2'],
        entities: {
          '1': { id: '1' },
          '2': { id: '2' },
        },
        loading: false,
        error: undefined,
      };

      // Use the selector to get the loading state
      const result = selectBooksLoading.projector(mockState);

      expect(result).toBe(false);
    });
  });
});
