import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../models/book.model';
import { BookFacade } from 'src/app/store/facades/book-facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-book-detail-page',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatIconModule, MatButtonModule],
  templateUrl: './book-detail-page.component.html',
  styleUrls: ['./book-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookDetailPageComponent implements OnInit {
  book$: Observable<Book | undefined>;

  constructor(
    private readonly location: Location,
    private readonly bookFacade: BookFacade,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.book$ = this.bookFacade.getBookById(Number(bookId)).pipe(
      tap((book) => {
        if (!book) {
          this.redirectToPageNotFound();
        }
      }),
    );
  }

  private redirectToPageNotFound(): void {
    this.router.navigate(['/404']);
  }

  onBackClicked(): void {
    this.location.back();
  }
}
