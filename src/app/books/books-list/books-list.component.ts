import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Book } from '../models/book.model';
import { BookListItemComponent } from '../book-list-item/book-list-item.component';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BookListItemComponent],
})
export class BooksListComponent {
  @Input({ required: true }) books: Book[];

  trackByBook(_index: number, book: Book): string {
    return book.isbn;
  }
}
