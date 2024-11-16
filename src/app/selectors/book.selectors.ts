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

export const selectBookById = (bookId: number) =>
  createSelector(getBooksState, (state: BookState) => {
    return state?.entities ? state.entities[bookId] : undefined;
  });

export const selectFilter = createSelector(getBooksState, (state: BookState) => state.filter);

export const selectFilteredBooks = createSelector(selectBooks, selectFilter, (books, filter) => {
  if (!filter) return books;
  return books.filter((book) => book.name.toLowerCase().startsWith(filter.toLowerCase()));
});
