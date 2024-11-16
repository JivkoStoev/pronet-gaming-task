import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BooksListComponent } from '../books-list/books-list.component';
import { BookFacade } from '../../store/facades/book-facade';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-books-favorites',
  templateUrl: './books-favorites.component.html',
  styleUrls: ['./books-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BooksListComponent],
})
export class BooksFavoritesComponent implements OnInit {
  favoriteBooks$: Observable<Book[]>;

  constructor(private readonly bookFacade: BookFacade) {}

  ngOnInit(): void {
    this.favoriteBooks$ = this.bookFacade.getFavoriteBooks$;
  }
}
