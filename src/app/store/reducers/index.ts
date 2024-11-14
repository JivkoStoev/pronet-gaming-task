import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import * as fromBook from '../../reducers/book.reducer';

export interface State {  [fromBook.booksFeatureKey]: fromBook.State;
}

export const reducers: ActionReducerMap<State> = {  [fromBook.booksFeatureKey]: fromBook.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
