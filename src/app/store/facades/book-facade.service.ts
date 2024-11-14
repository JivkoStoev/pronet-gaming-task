import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookActions } from '../actions/book.actions';

@Injectable({
  providedIn: 'root'
})
export class BookFacadeService {

  constructor(private store: Store) { }

  loadBooks(){
    this.store.dispatch(BookActions.loadBooks())
  }
}
