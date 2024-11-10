import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-books-favorites',
  templateUrl: './books-favorites.component.html',
  styleUrls: ['./books-favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksFavoritesComponent {}
