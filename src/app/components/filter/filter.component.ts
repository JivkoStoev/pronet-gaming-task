import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterComponent {
  @Input({ required: true }) label: string;
  @Input({ required: true }) placeholder: string;
  @Output() filterChanged = new EventEmitter<string>();

  onFilterChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.filterChanged.emit(input.value);
  }
}
