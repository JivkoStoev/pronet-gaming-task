import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookActions } from '../actions/book.actions';
import { BookService } from '../../books/services/book.service';
import { Book } from 'src/app/books/models/book.model';

@Injectable()
export class BookEffects {
  constructor(
    private actions$: Actions,
    private readonly bookService: BookService,
  ) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBooks),
      concatMap(() =>
        this.bookService.getBooks().pipe(
          map((books) => BookActions.loadBooksSuccess({ books })),
          catchError((error) => of(BookActions.loadBooksFailure({ error }))),
        ),
      ),
    );
  });

  loadBookById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BookActions.loadBookById),
      switchMap(({ bookId }) =>
        this.bookService.getBookById(bookId).pipe(
          map((book: Book) => BookActions.loadBookByIdSuccess({ book })),
          catchError((error) => of(BookActions.loadBookByIdFailure({ error }))),
        ),
      ),
    );
  });
}
