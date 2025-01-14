import { FormControl, FormGroup } from '@angular/forms';

export interface ItemForm {
  id: FormControl<number | null>;
  name: FormControl<string | null>;
  value: FormControl<number | null>;
}

export type CustomFormGroup = FormGroup<ItemForm>;
