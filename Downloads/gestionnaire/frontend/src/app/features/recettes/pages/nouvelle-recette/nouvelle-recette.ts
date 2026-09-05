import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RecetteService } from '../../services/recette';

@Component({
  selector: 'app-nouvelle-recette',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvelle-recette.html',
  styleUrl: './nouvelle-recette.css'
})
export class NouvelleRecette {
  private fb = inject(FormBuilder);
  private recetteService = inject(RecetteService);
  private router = inject(Router);

  saving = false;
  errorMessage = '';

  recetteForm = this.fb.nonNullable.group({
    libelle: ['', Validators.required],
    montant: [0, [Validators.required, Validators.min(1)]],
    source: ['Subvention', Validators.required],
    dateRecette: ['', Validators.required]
  });

  onSubmit() {
    if (this.recetteForm.invalid) return;

    this.saving = true;
    this.recetteService.create(this.recetteForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/recettes']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/recettes']);
  }
}
