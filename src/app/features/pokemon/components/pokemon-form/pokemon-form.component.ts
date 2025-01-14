import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomFormGroup, ItemForm } from '@app/shared/interfaces/customFormGroup.interface';
import { PokemonFormChildComponent } from '../pokemon-form-child/pokemon-form-child.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [ReactiveFormsModule, PokemonFormChildComponent],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonFormComponent {
  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([])
  });

  get items() {
    return this.form.controls.items;
  }

  itemsChanges = toSignal(this.form.valueChanges);

  totalValue = computed(() => {
    const value = this.itemsChanges()?.items?.reduce((total, item) => total + (Number(item?.value) || 0), 0);
    return value;
  });

  addItem() {
    const id = this.items.length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      value: this.fb.control(0, { validators: [Validators.required, Validators.min(0)] })
    });

    this.form.controls.items.push(itemForm);
  }
}
