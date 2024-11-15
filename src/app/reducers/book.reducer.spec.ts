import {
  reducer,
  initialState,
  BookState,
  booksAdapter,
  booksFeature,
  booksFeatureKey,
} from './book.reducer';
import { BookActions } from '../store/actions/book.actions';
import { Book } from '../books/models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('Books Reducer', () => {
  describe('initial state', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, { type: '@@INIT' });
      expect(state).toEqual(initialState);
    });
  });

  describe('loadBooks', () => {
    it('should set loading to true', () => {
      const action = BookActions.loadBooks();
      const state = reducer(initialState, action);
      expect(state.loading).toBeTrue();
    });
  });

  describe('loadBooksFailure and loadBooksSuccess', () => {
    it('should set loading to false on loadBooksFailure', () => {
      const action = BookActions.loadBooksFailure({ error: new HttpErrorResponse({}) });
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBeFalse();
    });

    it('should set loading to false on loadBooksSuccess', () => {
      const action = BookActions.loadBooksSuccess({ books: [] });
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBeFalse();
    });
  });

  describe('Entity Selectors', () => {
    const mockBooks: Book[] = [{ id: '1' }, { id: '2' }];

    let state: BookState;

    beforeEach(() => {
      // Initialize the state using the adapter's setAll function to ensure ids and entities are populated
      state = booksAdapter.setAll(mockBooks, { ...initialState, loading: false });
    });

    it('should select all book entities', () => {
      const mockRootState = {
        [booksFeatureKey]: state,
      };

      const selectedBooks = booksFeature.selectAll(mockRootState);

      expect(selectedBooks.length).toBe(2);
    });

    it('should select total book count', () => {
      const mockRootState = {
        [booksFeatureKey]: state,
      };

      const totalBooks = booksFeature.selectTotal(mockRootState);
      expect(totalBooks).toBe(2);
    });

    it('should select book entities as a dictionary', () => {
      const mockRootState = {
        [booksFeatureKey]: state,
      };

      const entities = booksFeature.selectEntities(mockRootState);
      expect(entities['1']).toEqual(mockBooks[0]);
      expect(entities['2']).toEqual(mockBooks[1]);
    });
  });
});
