import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../actions/book.actions';
import {
  selectBookById,
  selectBooks,
  selectBooksLoading,
  selectFilteredBooks,
} from '../../selectors/book.selectors';
import { AppState } from '../reducers';
import { filter, Observable, switchMap } from 'rxjs';
import { Book } from '../../books/models/book.model';
@Injectable({
  providedIn: 'root',
})
export class BookFacade {
  constructor(private store: Store<AppState>) {}
  getAllBooks$ = this.store.select(selectBooks);
  getFilteredBooks$ = this.store.select(selectFilteredBooks);
  getBooksLoading$ = this.store.select(selectBooksLoading);

  // TO DO add loader
  // TO DO add favourites

  loadBooks() {
    this.store.dispatch(BookActions.loadBooks());
  }

  loadBookById(bookId: number) {
    this.store.dispatch(BookActions.loadBookById({ bookId }));
  }

  setFilter(filter: string): void {
    this.store.dispatch(BookActions.setBooksFilter({ filter }));
  }

  getBookById(bookId: number): Observable<Book | undefined> {
    this.loadBookById(bookId);
    return this.getBooksLoading$.pipe(
      filter((isLoading) => !isLoading),
      switchMap(() => this.store.select(selectBookById(bookId))),
    );
  }
}
