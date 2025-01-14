import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'app-scenaries-filter',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './scenaries-filter.component.html',
  styleUrl: './scenaries-filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScenariesFilterComponent {
  setFilter = output<string>();

  readonly filter = new FormControl('', [Validators.maxLength(6)]);

  errorMessage = signal('');

  constructor() {
    merge(this.filter.statusChanges, this.filter.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.filter.hasError('maxlength')) {
      this.errorMessage.set(
        'You must enter a value with a maximum of 6 characters'
      );
    } else if (this.filter.hasError('filter')) {
      this.errorMessage.set('Not a valid filter');
    } else {
      this.errorMessage.set('');
    }

    this.setFilter.emit(this.filter.value || '');
  }
}
