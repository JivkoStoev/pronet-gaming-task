import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../models/book.model';
import { Dictionary } from '@ngrx/entity';
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatButtonModule, MatIconModule],
})
export class BooksListComponent {
  @Input({ required: true }) books: Book[];

  trackByBook(_index: number, book: Book): string {
    return book.isbn;
  }
}
