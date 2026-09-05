import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DepenseService } from '../../services/depense';

@Component({
  selector: 'app-nouvelle-depense',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvelle-depense.html',
  styleUrl: './nouvelle-depense.css'
})
export class NouvelleDepense {
  private fb = inject(FormBuilder);
  private depenseService = inject(DepenseService);
  private router = inject(Router);

  saving = false;
  errorMessage = '';

  depenseForm = this.fb.nonNullable.group({
    libelle: ['', Validators.required],
    montant: [0, [Validators.required, Validators.min(1)]],
    categorie: ['Fournitures', Validators.required],
    dateDepense: ['', Validators.required]
  });

  onSubmit() {
    if (this.depenseForm.invalid) return;

    this.saving = true;
    this.depenseService.create(this.depenseForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/depenses']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/depenses']);
  }
}
