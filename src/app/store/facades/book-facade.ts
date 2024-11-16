import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../actions/book.actions';
import {
  selectBookById,
  selectBooks,
  selectBooksLoading,
  selectFavoriteBookIds,
  selectFavoriteBooks,
  selectFilteredBooks,
  selectIsBookFavorite,
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
  getFavoriteBookIds$ = this.store.select(selectFavoriteBookIds);
  getFavoriteBooks$ = this.store.select(selectFavoriteBooks);

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

  isFavorite$(bookId: number): Observable<boolean> {
    return this.store.select(selectIsBookFavorite(bookId));
  }

  addFavorite(bookId: number): void {
    this.store.dispatch(BookActions.addFavoriteBook({ bookId }));
  }

  removeFavorite(bookId: number): void {
    this.store.dispatch(BookActions.removeFavoriteBook({ bookId }));
  }
}
