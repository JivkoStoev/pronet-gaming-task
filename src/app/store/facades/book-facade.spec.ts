import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BookFacade } from './book-facade';
import { BookActions } from '../actions/book.actions';
import { selectBooksLoading } from 'src/app/selectors/book.selectors';

describe('BookFacade', () => {
  let store$: MockStore;
  let facade: BookFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookFacade, provideMockStore({})],
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

    it('should set books loading to false when loading new books', () => {
      facade.loadBooks();
      expect(selectBooksLoading).toBeTruthy();
    });
  });
});
