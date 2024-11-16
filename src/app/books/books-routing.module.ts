import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./books-page/books-page.component').then((m) => m.BooksPageComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./books-favorites/books-favorites.component').then((m) => m.BooksFavoritesComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}
