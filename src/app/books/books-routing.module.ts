import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksFavoritesComponent } from './books-favorites/books-favorites.component';
import { BooksPageComponent } from './books-page/books-page.component';

const routes: Routes = [
  { path: '', component: BooksPageComponent },
  { path: 'favorites', component: BooksFavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
