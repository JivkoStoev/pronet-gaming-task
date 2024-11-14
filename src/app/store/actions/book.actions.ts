import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Book } from '../../books/models/book.model';
import { HttpErrorResponse } from '@angular/common/http';

export const BookActions = createActionGroup({
  source: 'Book/API',
  events: {
    'Load Books': emptyProps(),
    'Load Books Success': props<{ books: Book[] }>(),
    'Load Books Failure': props<{ error: HttpErrorResponse }>(),
    'Add Book': props<{ book: Book }>(),
    'Upsert Book': props<{ book: Book }>(),
    'Add Books': props<{ books: Book[] }>(),
    'Upsert Books': props<{ books: Book[] }>(),
    'Update Book': props<{ book: Update<Book> }>(),
    'Update Books': props<{ books: Update<Book>[] }>(),
    'Delete Book': props<{ id: string }>(),
    'Delete Books': props<{ ids: string[] }>(),
    'Clear Books': emptyProps(),
  },
});
