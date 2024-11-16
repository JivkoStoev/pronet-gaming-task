import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { By } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FilterComponent,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct label and placeholder', () => {
    component.label = 'Search Books';
    component.placeholder = 'Type a book title';
    fixture.detectChanges();

    const label = fixture.debugElement.query(By.css('mat-label')).nativeElement;
    const input = fixture.debugElement.query(By.css('input')).nativeElement;

    expect(label.textContent).toContain('Search Books');
    expect(input.getAttribute('placeholder')).toBe('Type a book title');
  });

  it('should emit filterChanged event when input value changes', () => {
    spyOn(component.filterChanged, 'emit');

    component.label = 'Search';
    component.placeholder = 'Type something';
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));

    expect(component.filterChanged.emit).toHaveBeenCalledWith('test');
  });

  it('should include a search icon in the input field', () => {
    fixture.detectChanges();

    const iconElement = fixture.debugElement.query(By.css('mat-icon')).nativeElement;
    expect(iconElement.textContent).toContain('search');
  });
});
