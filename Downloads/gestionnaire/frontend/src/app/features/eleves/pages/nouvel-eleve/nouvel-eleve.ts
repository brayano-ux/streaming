import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EleveService } from '../../services/eleve';

@Component({
  selector: 'app-nouvel-eleve',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvel-eleve.html',
  styleUrl: './nouvel-eleve.css',
})
export  class NouvelEleve {
  private fb = inject(FormBuilder);
  private eleveService = inject(EleveService);
  private router = inject(Router);
  loading = false;
  errorMessage = '';

  eleveForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    dateNaissance: ['', Validators.required],
    sexe: this.fb.nonNullable.control<'M' | 'F'>('M', Validators.required),
    nomParent: ['', Validators.required],
    telephoneParent: ['', Validators.required],
    matricule: ['', Validators.required],
    lieuNaissance: ['', Validators.required]
  });

  onSubmit() {
    if (this.eleveForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';

    this.eleveService.create(this.eleveForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/eleves']),
      error: () => {
        this.loading = false;
        this.errorMessage = "Échec de l'enregistrement. Vérifie les champs.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/eleves']);
  }
}
