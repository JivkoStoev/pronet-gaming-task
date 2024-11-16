import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BooksListComponent } from './books-list.component';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book.model';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  const mockBooks: Book[] = [
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
    TestBed.configureTestingModule({
      declarations: [],
      imports: [BooksListComponent, BookListItemComponent, CommonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    component.books = mockBooks;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the authors correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const authors = fixture.debugElement.queryAll(By.css('mat-card-subtitle'));
    expect(authors.length).toBe(2);
    expect(authors[0].nativeElement.textContent).toContain('George R. R. Martin');
    expect(authors[1].nativeElement.textContent).toContain('George R. R. Martin');
  }));

  it('should include Material Card elements', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const matCards = fixture.debugElement.queryAll(By.css('mat-card'));
    expect(matCards.length).toBe(2);
  }));

  it('should display the book names correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const bookTitles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(bookTitles.length).toBe(2);
    expect(bookTitles[0].nativeElement.textContent).toContain('A Game of Thrones');
    expect(bookTitles[1].nativeElement.textContent).toContain('A Clash of Kings');
  }));
});
