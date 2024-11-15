import { createSelector } from '@ngrx/store';
import { BookState } from '../reducers/book.reducer';

export const getBooksState = (state: BookState) => state;

export const selectBooksLoading = createSelector(getBooksState, (basket) => basket.loading);
