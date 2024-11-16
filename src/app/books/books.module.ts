import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from '../store/effects/book.effects';

@NgModule({
  declarations: [],
  imports: [CommonModule, BooksRoutingModule, EffectsModule.forFeature([BookEffects])],
})
export class BooksModule {}
