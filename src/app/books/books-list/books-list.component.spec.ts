import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksListComponent } from './books-list.component';
import { By } from '@angular/platform-browser';

describe('BooksListComponent', () => {
  let component: BooksListComponent;
  let fixture: ComponentFixture<BooksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BooksListComponent],
    });

    fixture = TestBed.createComponent(BooksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the template correctly', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled).toBeTruthy();
  });

  it('should include Material Card elements', () => {
    const matCard = fixture.debugElement.query(By.css('mat-card'));
    expect(matCard).toBeTruthy();
  });
});
