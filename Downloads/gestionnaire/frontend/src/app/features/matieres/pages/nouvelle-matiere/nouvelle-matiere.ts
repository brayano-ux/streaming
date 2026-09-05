import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatiereService } from '../../services/matiere';

@Component({
  selector: 'app-nouvelle-matiere',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nouvelle-matiere.html',
})
export class NouvelleMatiere {
  private fb = inject(FormBuilder);
  private matiereService = inject(MatiereService);
  private router = inject(Router);

  saving = false;
  errorMessage = '';

  matiereForm: FormGroup = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(2)]],
    coefficient: [1, [Validators.required, Validators.min(1)]],
  });

  ajouter(): void {
    if (this.matiereForm.invalid) return;

    this.saving = true;
    this.errorMessage = '';

    this.matiereService.create(this.matiereForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard/matieres']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }
}
