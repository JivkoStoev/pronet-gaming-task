import { createSelector } from '@ngrx/store';
import { BookState } from '../reducers/book.reducer';
import { Book } from '../books/models/book.model';
import { AppState } from '../store/reducers';

export const getBooksState = (state: AppState) => state?.books;

export const selectBooksLoading = createSelector(getBooksState, (books) => books.loading);

export const selectBooks = createSelector(getBooksState, (state: BookState) => {
  return state?.entities
    ? Object.values(state.entities).filter((book): book is Book => book !== undefined)
    : [];
});
