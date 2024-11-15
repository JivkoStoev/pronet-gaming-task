import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromBook from '../../reducers/book.reducer';

export interface AppState {
  [fromBook.booksFeatureKey]: fromBook.BookState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromBook.booksFeatureKey]: fromBook.reducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
