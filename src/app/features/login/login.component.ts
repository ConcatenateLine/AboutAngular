import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  errorMessage: string | null = null;

  authService = inject(AuthService);
  fb = inject(NonNullableFormBuilder);

  loginForm = this.fb.group<LoginForm>({
    email: this.fb.control('', Validators.required),
    password: this.fb.control('', Validators.required)
  });

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();

      this.authService.login(email, password).subscribe({
        next: () => {
          window.location.href = '/dashboard';
        },
        error: (_err) => {
          this.errorMessage = 'Invalid credentials';
        }
      });
    }
  }
}
