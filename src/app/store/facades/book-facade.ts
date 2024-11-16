import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../actions/book.actions';
import { selectBooks, selectBooksLoading } from '../../selectors/book.selectors';
import { AppState } from '../reducers';
@Injectable({
  providedIn: 'root',
})
export class BookFacade {
  constructor(private store: Store<AppState>) {}
  getAllBooks$ = this.store.select(selectBooks);
  getBooksLoading$ = this.store.select(selectBooksLoading);

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks());
  }
}
