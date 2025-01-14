import { CustomInputComponent } from './custom-input-component.component';
import { fireEvent, render } from '@testing-library/angular';
import { FormControl } from '@angular/forms';

describe('CustomInputComponent', () => {
  beforeEach(async () => {

  });

  it('should create', async () => {
    const { getByRole } = await render(CustomInputComponent, {
      componentInputs: { control: new FormControl<string>('') },
    });

    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'test value' } });

    expect(input.value).toBe('test value');
  });

  it('should update the value when input changes', async () => {
    const { getByRole } = await render(CustomInputComponent, {
      componentInputs: { control: new FormControl('default test') },
    });

    const input = getByRole('textbox') as HTMLInputElement;
    fireEvent.input(input, { target: { value: 'edit value' } });

    expect(input.value).toBe('edit value');
  });

  it('should disable the input when setDisabledState is called with true', async () => {
    const { getByRole, fixture } = await render(CustomInputComponent, {
      componentInputs: { control: new FormControl('') },
    });

    const input = getByRole('textbox') as HTMLInputElement;
    const componentInstance = fixture.componentInstance;
    componentInstance.setDisabledState(true);
    fixture.detectChanges();

    expect(input.disabled).toBe(true);
  });

  it('should enable the input when setDisabledState is called with false', async () => {
    const { getByRole, fixture } = await render(CustomInputComponent, {
      componentInputs: { control: new FormControl('') },
    });

    const input = getByRole('textbox') as HTMLInputElement;
    const componentInstance = fixture.componentInstance;
    componentInstance.setDisabledState(false);
    fixture.detectChanges();

    expect(input.disabled).toBe(false);
  });
});
