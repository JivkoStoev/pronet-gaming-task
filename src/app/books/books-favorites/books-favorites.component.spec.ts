import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BooksFavoritesComponent } from './books-favorites.component';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookFacade } from '../../store/facades/book-facade';
import { of } from 'rxjs';
import { Book } from '../models/book.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

describe('BooksFavoritesComponent', () => {
  let component: BooksFavoritesComponent;
  let fixture: ComponentFixture<BooksFavoritesComponent>;

  const mockBookFacade = {
    getFavoriteBooks$: of([
      {
        id: 1,
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
        url: 'https://anapioficeandfire.com/api/book/1',
      },
      {
        id: 2,
        isbn: '978-0553103550',
        name: 'A Clash of Kings',
        authors: ['George R. R. Martin'],
        numberOfPages: 768,
        publisher: 'Bantam Books',
        country: 'United States',
        mediaType: 'Hardcover',
        released: '1999-02-02T00:00:00',
        characters: ['https://anapioficeandfire.com/api/characters/3'],
        povCharacters: ['https://anapioficeandfire.com/api/characters/149'],
        url: 'https://anapioficeandfire.com/api/book/2',
      },
    ] as Book[]),

    isFavorite$: (bookId: number) => of(true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, BooksListComponent, BooksFavoritesComponent],
      declarations: [],
      providers: [
        { provide: BookFacade, useValue: mockBookFacade },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(BooksFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the favorite books list when there are favorite books', () => {
    const favoriteBooks = fixture.nativeElement.querySelector('app-books-list');
    expect(favoriteBooks).toBeTruthy();
  });
});
