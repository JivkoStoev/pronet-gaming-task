import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
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
      catchError(() => {
        return throwError('Failed to fetch books');
      }),
    );
  }

  getBookById(bookId: number): Observable<Book> {
    return this.httpClient.get<Book>(`${this.apiBaseUrl}books/${bookId}`).pipe(
      map((book) => ({
        ...book,
        id: +bookId,
      })),
      catchError(() => {
        return throwError('Book not found');
      }),
    );
  }
}
