import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksPageComponent } from './books-page.component';
import { BookFacade } from 'src/app/store/facades/book-facade';
import { instance, mock, when, verify } from 'ts-mockito';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from '../../components/filter/filter.component';
import { ActivatedRoute } from '@angular/router';

describe('BooksPageComponent', () => {
  let component: BooksPageComponent;
  let fixture: ComponentFixture<BooksPageComponent>;
  let bookFacade: BookFacade;

  const mockBooks = [
    {
      isbn: '978-0553103540',
      name: 'A Game of Thrones',
      authors: ['George R. R. Martin'],
      numberOfPages: 694,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      released: '1996-08-01T00:00:00',
      characters: ['https://anapioficeandfire.com/api/characters/2'],
      povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
      id: 1,
      url: 'https://anapioficeandfire.com/api/book/1',
    },
    {
      isbn: '978-0553103541',
      name: 'A Clash of Kings',
      authors: ['George R. R. Martin'],
      numberOfPages: 768,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      released: '1998-11-16T00:00:00',
      characters: ['https://anapioficeandfire.com/api/characters/3'],
      povCharacters: ['https://anapioficeandfire.com/api/characters/149'],
      id: 2,
      url: 'https://anapioficeandfire.com/api/book/2',
    },
  ];

  beforeEach(() => {
    bookFacade = mock(BookFacade);

    when(bookFacade.getFilteredBooks$).thenReturn(of(mockBooks));
    when(bookFacade.getBooksLoading$).thenReturn(of(false));

    TestBed.configureTestingModule({
      imports: [BooksPageComponent, HttpClientTestingModule, BrowserAnimationsModule],
      providers: [
        { provide: BookFacade, useFactory: () => instance(bookFacade) },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
    });

    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load filtered books and pass them to the BooksListComponent', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const booksListComponent = fixture.debugElement.query(
      By.css('app-books-list'),
    ).componentInstance;
    expect(booksListComponent.books).toEqual(mockBooks);
  }));

  it('should display the correct number of books in the BooksListComponent', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const bookElements = fixture.debugElement.queryAll(By.css('app-books-list mat-card'));
    expect(bookElements.length).toBe(mockBooks.length);
  }));

  it('should handle filter changes and update the store', fakeAsync(() => {
    const filterComponent = fixture.debugElement.query(By.directive(FilterComponent))
      .componentInstance as FilterComponent;

    const filterValue = 'A Game of Thrones';

    filterComponent.filterChanged.emit(filterValue);
    tick();
    fixture.detectChanges();

    verify(bookFacade.setFilter(filterValue)).once();
  }));

  it('should render the FilterComponent', () => {
    const filterElement = fixture.debugElement.query(By.directive(FilterComponent));
    expect(filterElement).toBeTruthy();
  });

  it('should pass the correct label and placeholder to the FilterComponent', () => {
    const filterComponent = fixture.debugElement.query(By.directive(FilterComponent))
      .componentInstance as FilterComponent;

    expect(filterComponent.label).toBe('Filter by Title');
    expect(filterComponent.placeholder).toBe('Enter book title');
  });
});
