import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BooksPageComponent } from './books-page.component';
import { BookFacade } from 'src/app/store/facades/book-facade';
import { instance, mock, when } from 'ts-mockito';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

    when(bookFacade.getAllBooks$).thenReturn(of(mockBooks));

    TestBed.configureTestingModule({
      imports: [BooksPageComponent, HttpClientTestingModule],
      providers: [{ provide: BookFacade, useFactory: () => instance(bookFacade) }],
    });

    fixture = TestBed.createComponent(BooksPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load books and pass them to the BooksListComponent', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const booksListComponent = fixture.debugElement.query(
      By.css('app-books-list'),
    ).componentInstance;
    expect(booksListComponent.books).toEqual(mockBooks);
  }));

  it('should display the correct number of books', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    const bookElements = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(bookElements.length).toBe(mockBooks.length);
  }));
});
