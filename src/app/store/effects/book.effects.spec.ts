import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { instance, mock } from 'ts-mockito';

import { BookEffects } from './book.effects';
import { BookService } from 'src/app/books/services/book.service';
import { Action } from '@ngrx/store';

describe('BookEffects', () => {
  let actions$: Observable<Action>;
  let effects: BookEffects;
  let bookServiceMock: BookService;

  beforeEach(() => {
    bookServiceMock = mock(BookService);

    TestBed.configureTestingModule({
      providers: [
        BookEffects,
        { provide: BookService, useFactory: () => instance(bookServiceMock) },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.inject(BookEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
