import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../models/book.model';
import { RouterModule } from '@angular/router';
import { BookFacade } from '../../store/facades/book-facade';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-book-list-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListItemComponent implements OnInit {
  @Input({ required: true }) book: Book;

  isFavorite$: Observable<boolean>;

  constructor(private readonly bookFacade: BookFacade) {}

  ngOnInit(): void {
    this.isFavorite$ = this.bookFacade.isFavorite$(this.book.id);
  }

  toggleFavorite(): void {
    this.isFavorite$.pipe(take(1)).subscribe((isFavorite) => {
      if (isFavorite) {
        this.bookFacade.removeFavorite(this.book.id);
      } else {
        this.bookFacade.addFavorite(this.book.id);
      }
    });
  }
}
