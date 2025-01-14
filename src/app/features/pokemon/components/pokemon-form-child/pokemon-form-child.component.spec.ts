import { PokemonFormChildComponent } from './pokemon-form-child.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ItemForm } from '@app/shared/interfaces/customFormGroup.interface';
import { render, screen, fireEvent } from '@testing-library/angular';

describe('PokemonFormChildComponent', () => {
  let formGroup: FormGroup<ItemForm>;

  const createFormGroup = () => new FormGroup<ItemForm>({
    id: new FormControl<number>(0),
    name: new FormControl<string>('', [Validators.required]),
    value: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
  });

  beforeEach(() => {
    formGroup = createFormGroup();
  });

  it('should create component', async () => {
    const { fixture } = await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should validate required name field', async () => {
    const { fixture } = await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    
    const nameInput = screen.getAllByRole('textbox')[0];
    await fireEvent.input(nameInput, { target: { value: '' } });
    expect(formGroup.get('name')?.errors?.['required']).toBeTruthy();
  });

  it('should validate minimum value', async () => {
    const { fixture } = await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    
    const valueInput = screen.getAllByRole('textbox')[1];
    await fireEvent.input(valueInput, { target: { value: '-1' } });
    expect(formGroup.get('value')?.errors?.['min']).toBeTruthy();
  });

  it('should update form values correctly', async () => {
    const { fixture } = await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    
    const nameInput = screen.getAllByRole('textbox')[0];
    const valueInput = screen.getAllByRole('textbox')[1];
    
    await fireEvent.input(nameInput, { target: { value: 'Pikachu' } });
    await fireEvent.input(valueInput, { target: { value: '100' } });
    
    expect(formGroup.get('name')?.value).toBe('Pikachu');
    expect(formGroup.get('value')?.value).toBe("100");
  });

  it('should show error message when name is empty', async () => {
    await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    
    const nameInput = screen.getAllByRole('textbox')[0];
    await fireEvent.input(nameInput, { target: { value: 'test' } });
    await fireEvent.input(nameInput, { target: { value: '' } });
    
    const errorElement = screen.getByText('This field is required');
    expect(errorElement).toBeInTheDocument();
  });

  it('should emit form value when valid', async () => {
    const { fixture } = await render(PokemonFormChildComponent, {
      inputs: { formGroup }
    });
    
    const nameInput = screen.getAllByRole('textbox')[0];
    const valueInput = screen.getAllByRole('textbox')[1];
    
    await fireEvent.input(nameInput, { target: { value: 'Pikachu' } });
    await fireEvent.input(valueInput, { target: { value: '100' } });
    
    expect(formGroup.valid).toBeTruthy();
  });
});
