import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private readonly apiBaseUrl = 'https://anapioficeandfire.com/api/';

  constructor(private readonly httpClient: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.apiBaseUrl}books`).pipe(
      map((books) =>
        books.map((book, index) => {
          return { ...book, id: index + 1 }; // there isn't id field for book
        }),
      ),
    );
  }
}
