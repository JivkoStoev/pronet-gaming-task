import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksFavoritesComponent } from './books-favorites/books-favorites.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'favorites', component: BooksFavoritesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
