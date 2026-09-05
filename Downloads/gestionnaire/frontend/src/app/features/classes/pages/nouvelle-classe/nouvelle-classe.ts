import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe';

@Component({
  selector: 'app-nouvelle-classe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvelle-classe.html',
  styleUrl: './nouvelle-classe.css'
})
export class NouvelleClasse {
  private fb = inject(FormBuilder);
  private classeService = inject(ClasseService);
  private router = inject(Router);

  loading = false;
  errorMessage = '';

  classeForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    niveau: ['', Validators.required]
  });

  onSubmit() {
    if (this.classeForm.invalid) return;

    this.loading = true;
    this.classeService.create(this.classeForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/classes']),
      error: () => {
        this.loading = false;
        this.errorMessage = "Échec de la création de la classe.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/classes']);
  }
}
