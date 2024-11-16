import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookFacade } from '../../store/facades/book-facade';
import { Observable, tap } from 'rxjs';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, BooksListComponent],
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;
  booksLoader$: Observable<boolean>;

  constructor(private bookFacade: BookFacade) {}

  ngOnInit(): void {
    this.bookFacade.loadBooks();

    this.books$ = this.bookFacade.getAllBooks$.pipe(tap((books) => console.log(books)));
    this.booksLoader$ = this.bookFacade.getBooksLoading$;
  }
}
