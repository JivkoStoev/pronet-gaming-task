import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksFavoritesComponent } from './books-favorites/books-favorites.component';

@NgModule({
  declarations: [BooksListComponent, BooksFavoritesComponent],
  imports: [CommonModule, BooksRoutingModule],
})
export class BooksModule {}
