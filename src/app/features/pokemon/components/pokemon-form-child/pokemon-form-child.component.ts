import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/shared/components/custom-input-component/custom-input-component.component';
import { ItemForm } from '@app/shared/interfaces/customFormGroup.interface';

@Component({
  selector: 'app-pokemon-form-child',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './pokemon-form-child.component.html',
  styleUrl: './pokemon-form-child.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonFormChildComponent {
  formGroup = input.required<FormGroup<ItemForm>>();
}
