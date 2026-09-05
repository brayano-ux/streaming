import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EnseignantService } from '../../services/enseignant';

@Component({
  selector: 'app-modifier-enseignant',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-enseignant.html',
  styleUrl: './modifier-enseignant.css'
})
export class ModifierEnseignant implements OnInit {
  private fb = inject(FormBuilder);
  private enseignantService = inject(EnseignantService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  enseignantId!: number;
  loading = signal(true);
  saving = false;
  errorMessage = '';

  enseignantForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    matiere: ['', Validators.required],
    telephone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
    this.enseignantId = Number(this.route.snapshot.paramMap.get('id'));

    this.enseignantService.getById(this.enseignantId).subscribe({
      next: (enseignant) => {
        this.enseignantForm.patchValue(enseignant);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage = "Impossible de charger cet enseignant.";
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.enseignantForm.invalid) return;

    this.saving = true;
    this.enseignantService.update(this.enseignantId, this.enseignantForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/enseignants']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de la mise à jour.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/enseignants']);
  }
}
