import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  errorMessage = '';
  loading = false;

  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    motDePasse: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    const { email, motDePasse } = this.loginForm.value;

    this.authService.login(email!, motDePasse!).subscribe({
      next: () => this.loading = false,
      error: () => {
        this.loading = false;
        this.errorMessage = 'Email ou mot de passe incorrect.';
      }
    });
  }
}
