import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Book } from '../models/book.model';
import { BookFacade } from '../../store/facades/book-facade';
import { BookListItemComponent } from './book-list-item.component';

describe('BookListItemComponent', () => {
  let component: BookListItemComponent;
  let fixture: ComponentFixture<BookListItemComponent>;
  let mockBookFacade: jasmine.SpyObj<BookFacade>;

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
    mockBookFacade = jasmine.createSpyObj('BookFacade', [
      'isFavorite$',
      'addFavorite',
      'removeFavorite',
    ]);
    mockBookFacade.isFavorite$.and.returnValue(of(false));

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BookListItemComponent,
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        MatIconModule,
        RouterTestingModule,
      ],
      providers: [{ provide: BookFacade, useValue: mockBookFacade }],
    });

    fixture = TestBed.createComponent(BookListItemComponent);
    component = fixture.componentInstance;
    component.book = mockBook;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the book details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-card-title')?.textContent).toContain('A Game of Thrones');
    expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain(
      'George R. R. Martin',
    );
    expect(compiled.textContent).toContain('Publisher: Bantam Books');
    expect(compiled.textContent).toContain('Number of Pages: 694');
    expect(compiled.textContent).toContain('Release Date:');
  });

  it('should toggle favorite status when the favorite button is clicked', () => {
    spyOn(component, 'toggleFavorite').and.callThrough();

    const button = fixture.nativeElement.querySelector('.favorite-btn');
    button.click();

    expect(component.toggleFavorite).toHaveBeenCalled();
    expect(mockBookFacade.addFavorite).toHaveBeenCalledWith(mockBook.id);
  });
});
