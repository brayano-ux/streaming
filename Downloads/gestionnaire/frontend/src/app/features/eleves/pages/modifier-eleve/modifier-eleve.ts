import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EleveService } from '../../services/eleve';

@Component({
  selector: 'app-modifier-eleve',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-eleve.html',
  styleUrl: './modifier-eleve.css',
})
export class ModifierEleve implements OnInit {
  private fb = inject(FormBuilder);
  private eleveService = inject(EleveService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  eleveId!: number;
  loading = signal(true);
  saving = false;
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

  ngOnInit() {
    this.eleveId = Number(this.route.snapshot.paramMap.get('id'));

    this.eleveService.getById(this.eleveId).subscribe({
      next: (eleve) => {
        this.eleveForm.patchValue(eleve);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage = "Impossible de charger cet élève.";
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.eleveForm.invalid) return;

    this.saving = true;
    this.eleveService.update(this.eleveId, this.eleveForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/eleves']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de la mise à jour.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/eleves']);
  }
}
