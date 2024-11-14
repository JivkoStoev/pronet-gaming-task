import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Book } from '../books/models/book.model';
import { BookActions } from '../store/actions/book.actions';
import { HttpErrorResponse } from '@angular/common/http';

export const booksFeatureKey = 'books';

export interface State extends EntityState<Book> {
  // additional entities state properties
  loading: boolean;
  error: HttpErrorResponse | undefined;
}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: undefined,
});

export const reducer = createReducer(
  initialState,
  on(BookActions.addBook, (state, action) => adapter.addOne(action.book, state)),
  on(BookActions.upsertBook, (state, action) => adapter.upsertOne(action.book, state)),
  on(BookActions.addBooks, (state, action) => adapter.addMany(action.books, state)),
  on(BookActions.upsertBooks, (state, action) => adapter.upsertMany(action.books, state)),
  on(BookActions.updateBook, (state, action) => adapter.updateOne(action.book, state)),
  on(BookActions.updateBooks, (state, action) => adapter.updateMany(action.books, state)),
  on(BookActions.deleteBook, (state, action) => adapter.removeOne(action.id, state)),
  on(BookActions.deleteBooks, (state, action) => adapter.removeMany(action.ids, state)),
  on(BookActions.loadBooks, (state): State => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(BookActions.loadBooksFailure,BookActions.loadBooksSuccess, (state): State => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(BookActions.clearBooks, (state) => adapter.removeAll(state)),
);

export const booksFeature = createFeature({
  name: booksFeatureKey,
  reducer,
  extraSelectors: ({ selectBooksState }) => ({
    ...adapter.getSelectors(selectBooksState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } = booksFeature;
