import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatiereService } from '../../services/matiere';
import { Matiere } from '../../../../core/models/matiere';

@Component({
  selector: 'app-liste-matieres',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './liste-matieres.html',
  styleUrl: './liste-matieres.css'
})
export class ListeMatieres implements OnInit {
  private fb = inject(FormBuilder);
  private matiereService = inject(MatiereService);

  matieres = signal<Matiere[]>([]);
  loading = signal(true);
  errorMessage = '';

  matiereForm = this.fb.nonNullable.group({
    nom: ['', Validators.required],
    coefficient: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.charger();
  }

  charger() {
    this.matiereService.getAll().subscribe({
      next: (data) => {
        this.matieres.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  ajouter() {
    if (this.matiereForm.invalid) return;
    this.matiereService.create(this.matiereForm.getRawValue()).subscribe({
      next: (nouvelle) => {
        this.matieres.update(liste => [...liste, nouvelle]);
        this.matiereForm.reset({ nom: '', coefficient: 1 });
      },
      error: () => this.errorMessage = "Échec de l'ajout."
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette matière ?')) return;
    this.matiereService.delete(id).subscribe({
      next: () => this.matieres.update(liste => liste.filter(m => m.id !== id))
    });
  }
}
