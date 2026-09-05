import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ClasseService } from '../../services/classe';

@Component({
  selector: 'app-modifier-classe',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modifier-classe.html',
  styleUrl: './modifier-classe.css'
})
export class ModifierClasse implements OnInit {
  private fb = inject(FormBuilder);
  private classeService = inject(ClasseService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  classeId!: number;
  loading = signal(true);
  saving = false;
  errorMessage = '';

  classeForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    niveau: ['', Validators.required]
  });

  ngOnInit() {
    this.classeId = Number(this.route.snapshot.paramMap.get('id'));

    this.classeService.getById(this.classeId).subscribe({
      next: (classe) => {
        this.classeForm.patchValue(classe);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage = "Impossible de charger cette classe.";
        this.loading.set(false);
      }
    });
  }

  onSubmit() {
    if (this.classeForm.invalid) return;

    this.saving = true;
    this.classeService.update(this.classeId, this.classeForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/classes']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de la mise à jour.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/classes']);
  }
}
