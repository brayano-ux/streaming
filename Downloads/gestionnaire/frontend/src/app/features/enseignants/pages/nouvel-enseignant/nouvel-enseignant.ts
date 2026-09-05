import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EnseignantService } from '../../services/enseignant';

@Component({
  selector: 'app-nouvel-enseignant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvel-enseignant.html',
  styleUrl: './nouvel-enseignant.css'
})
export class NouvelEnseignant {
  private fb = inject(FormBuilder);
  private enseignantService = inject(EnseignantService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  enseignantForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    matiere: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.enseignantForm.invalid) return;

    this.loading = true;
    this.enseignantService.create(this.enseignantForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/enseignants']),
      error: () => {
        this.loading = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/enseignants']);
  }
}
