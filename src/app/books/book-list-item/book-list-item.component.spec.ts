import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListItemComponent } from './book-list-item.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../models/book.model';

describe('BookListItemComponent', () => {
  let component: BookListItemComponent;
  let fixture: ComponentFixture<BookListItemComponent>;
  const mockBook: Book = {
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
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BookListItemComponent,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
      ],
    });
    fixture = TestBed.createComponent(BookListItemComponent);
    component = fixture.componentInstance;
    component.book = mockBook;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
