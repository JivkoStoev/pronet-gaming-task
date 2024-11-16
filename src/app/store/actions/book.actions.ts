import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../../books/models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book/API',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),

    'Load Book By Id': props<{ bookId: number }>(),
    'Load Book By Id Success': props<{ book: Book }>(),
    'Load Book By Id Failure': props<{ error: HttpErrorResponse }>(),

    'Add Favorite Book': props<{ bookId: number }>(),
    'Remove Favorite Book': props<{ bookId: number }>(),

    'Set Books Filter': props<{ filter: string }>(),
  },
});
