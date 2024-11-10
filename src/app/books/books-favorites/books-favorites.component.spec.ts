import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksFavoritesComponent } from './books-favorites.component';

describe('BooksFavoritesComponent', () => {
  let component: BooksFavoritesComponent;
  let fixture: ComponentFixture<BooksFavoritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksFavoritesComponent],
    });
    fixture = TestBed.createComponent(BooksFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
