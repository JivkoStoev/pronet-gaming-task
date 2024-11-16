import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Book } from '../../books/models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book/API',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),
    'Set Books Filter': props<{ filter: string }>(),
  },
});
