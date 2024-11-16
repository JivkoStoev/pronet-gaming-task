import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDetailPageComponent } from './book-detail-page.component';
import { BookFacade } from 'src/app/store/facades/book-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Book } from '../models/book.model';

describe('BookDetailPageComponent', () => {
  let component: BookDetailPageComponent;
  let fixture: ComponentFixture<BookDetailPageComponent>;
  let bookFacade: jasmine.SpyObj<BookFacade>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const bookFacadeSpy = jasmine.createSpyObj('BookFacade', ['getBookById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        BookDetailPageComponent,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: BookFacade, useValue: bookFacadeSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } },
          },
        },
      ],
    });

    fixture = TestBed.createComponent(BookDetailPageComponent);
    component = fixture.componentInstance;
    bookFacade = TestBed.inject(BookFacade) as jasmine.SpyObj<BookFacade>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the book details when a valid book ID is provided', () => {
    const mockBook: Book = {
      id: 1,
      name: 'A Game of Thrones',
      isbn: '978-0553103540',
      authors: ['George R. R. Martin'],
      numberOfPages: 694,
      publisher: 'Bantam Books',
      country: 'United States',
      mediaType: 'Hardcover',
      released: '1996-08-01T00:00:00',
      characters: ['https://anapioficeandfire.com/api/characters/2'],
      povCharacters: ['https://anapioficeandfire.com/api/characters/148'],
      url: 'https://anapioficeandfire.com/api/books/1',
    };

    bookFacade.getBookById.and.returnValue(of(mockBook));

    fixture.detectChanges();

    const cardTitle = fixture.nativeElement.querySelector('mat-card-title');
    expect(cardTitle.textContent).toContain(mockBook.name);
    const cardSubtitle = fixture.nativeElement.querySelector('mat-card-subtitle');
    expect(cardSubtitle.textContent).toContain(mockBook.authors.join(', '));
  });

  it('should redirect to 404 page when the book is not found', () => {
    bookFacade.getBookById.and.returnValue(of(undefined));

    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/404']);
  });
});
