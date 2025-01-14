import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-input-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input-component.component.html',
  styleUrl: './custom-input-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true
  }]
})

export class CustomInputComponent implements ControlValueAccessor {
  control = input.required<FormControl<any>>();

  onChange = (_value: any) => { };
  onTouched = () => { };

  writeValue(value: any): void {
    if (value !== this.control().value) {
      this.control().setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control().disable() : this.control().enable();
  }
}


