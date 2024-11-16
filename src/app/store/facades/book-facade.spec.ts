import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookFacade } from './book-facade';
import { BookActions } from '../actions/book.actions';
import { selectBooksLoading, selectBooks, selectBookById } from 'src/app/selectors/book.selectors';
import { Book } from '../../books/models/book.model';

describe('BookFacade', () => {
  let store$: MockStore;
  let facade: BookFacade;

  const initialState = {
    books: { loading: false, books: [] },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookFacade, provideMockStore({ initialState })],
    });

    store$ = TestBed.inject(MockStore);
    facade = TestBed.inject(BookFacade);

    spyOn(store$, 'dispatch');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('#loadBooks', () => {
    it('should dispatch the loadBooks action', () => {
      const expectedAction = BookActions.loadBooks();

      facade.loadBooks();

      expect(store$.dispatch).toHaveBeenCalledWith(expectedAction);
    });

    it('should set books loading to false when loading new books', (done) => {
      store$.overrideSelector(selectBooksLoading, true);
      facade.loadBooks();
      facade.getBooksLoading$.subscribe((isLoading) => {
        expect(isLoading).toBe(true);
        done();
      });

      store$.overrideSelector(selectBooksLoading, false);
    });
  });
  describe('#getBookById', () => {
    it('should return undefined when the book is not found', (done) => {
      const bookId = 999;
      const missingBook = undefined;

      store$.overrideSelector(selectBookById(bookId), missingBook);
      store$.overrideSelector(selectBooksLoading, true);

      facade.getBookById(bookId).subscribe((returnedBook) => {
        expect(returnedBook).toBeUndefined();
        done();
      });

      store$.overrideSelector(selectBooksLoading, false);
      store$.refreshState();
    });
  });
});
