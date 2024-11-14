import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksFavoritesComponent } from './books-favorites/books-favorites.component';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '../store/effects/book.effects';

@NgModule({
  declarations: [BooksListComponent, BooksFavoritesComponent],
  imports: [CommonModule, BooksRoutingModule, EffectsModule.forFeature([BookEffects])],
})
export class BooksModule {}
