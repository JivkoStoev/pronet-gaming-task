import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../books/models/book.model';
import { BookActions } from '../store/actions/book.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const booksFeatureKey = 'books';

export interface BookState extends EntityState<Book> {
  loading: boolean;
  filter: string;
  favoriteBookIds: number[];
  error: HttpErrorResponse | undefined;
}

export const booksAdapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: BookState = booksAdapter.getInitialState({
  loading: false,
  filter: '',
  favoriteBookIds: [],
  error: undefined,
});

export const reducer = createReducer(
  initialState,
  on(BookActions.loadBooks, BookActions.loadBookById, (state): BookState => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(BookActions.loadBooksSuccess, BookActions.loadBookByIdSuccess, (state): BookState => {
    return {
      ...state,
      loading: false,
    };
  }),

  on(BookActions.loadBooksSuccess, (state, { books }): BookState => {
    return booksAdapter.addMany(books, {
      ...state,
      error: undefined,
    });
  }),

  on(BookActions.loadBookByIdSuccess, (state, { book }): BookState => {
    return booksAdapter.addOne(book, {
      ...state,
      error: undefined,
    });
  }),

  on(BookActions.addFavoriteBook, (state, { bookId }): BookState => {
    return {
      ...state,
      favoriteBookIds: [...state.favoriteBookIds, bookId],
    };
  }),

  on(BookActions.removeFavoriteBook, (state, { bookId }): BookState => {
    return {
      ...state,
      favoriteBookIds: state.favoriteBookIds.filter((id) => id !== bookId),
    };
  }),

  on(
    BookActions.loadBookByIdFailure,
    BookActions.loadBooksFailure,
    (state, { error }): BookState => ({
      ...state,
      loading: false,
      error,
    }),
  ),

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
