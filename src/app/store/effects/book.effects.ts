import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookActions } from '../actions/book.actions';
import { BookService } from '../../books/services/book.service';

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
}
