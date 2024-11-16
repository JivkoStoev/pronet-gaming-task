import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookFacade } from '../../store/facades/book-facade';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { FilterComponent } from '../../components/filter/filter.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-books-page',
  standalone: true,
  imports: [CommonModule, BooksListComponent, FilterComponent, LoaderComponent],
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

    this.books$ = this.bookFacade.getFilteredBooks$;
    this.booksLoader$ = this.bookFacade.getBooksLoading$;
  }

  onFilterChanged(filter: string): void {
    this.bookFacade.setFilter(filter);
  }
}
