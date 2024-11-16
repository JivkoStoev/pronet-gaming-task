import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../books/models/book.model';
import { BookActions } from '../store/actions/book.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const booksFeatureKey = 'books';

export interface BookState extends EntityState<Book> {
  loading: boolean;
  filter: string;
  error: HttpErrorResponse | undefined;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BookState = booksAdapter.getInitialState({
  loading: false,
  filter: '',
  error: undefined,
});

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, (state): BookState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(BookActions.loadBooksFailure, BookActions.loadBooksSuccess, (state): BookState => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(BookActions.loadBooksSuccess, (state, { books }): BookState => {
    return booksAdapter.addMany(books, state);
  }),
  on(BookActions.setBooksFilter, (state, { filter }): BookState => {
    return {
      ...state,
      filter,
    };
  }),
);

export const booksFeature = createFeature({
  name: booksFeatureKey,
  reducer,
  extraSelectors: ({ selectBooksState }) => ({
    ...booksAdapter.getSelectors(selectBooksState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = booksFeature;
