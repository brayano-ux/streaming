import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AffectationService } from '../../services/affectation';
import { ClasseService } from '../../../classes/services/classe';
import { MatiereService } from '../../services/matiere';
import { Classe } from '../../../../core/models/classe';
import { Matiere } from '../../../../core/models/matiere';
import { AffectationMatiere } from '../../../../core/models/affectation';

@Component({
  selector: 'app-affecter-matiere',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './affecter-matiere.html',
  styleUrl: './affecter-matiere.css'
})
export class AffecterMatiere implements OnInit {
  private fb = inject(FormBuilder);
  private affectationService = inject(AffectationService);
  private classeService = inject(ClasseService);
  private matiereService = inject(MatiereService);

  classes = signal<Classe[]>([]);
  matieres = signal<Matiere[]>([]);
  affectations = signal<AffectationMatiere[]>([]);
  loading = signal(true);
  errorMessage = '';

  form = this.fb.nonNullable.group({
    classeId: [0, [Validators.required, Validators.min(1)]],
    matiereId: [0, [Validators.required, Validators.min(1)]],
    coefficient: [1, [Validators.required, Validators.min(1)]]
  });

  ngOnInit() {
    this.classeService.getAll().subscribe(data => this.classes.set(data));
    this.matiereService.getAll().subscribe({
      next: (data) => {
        this.matieres.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onClasseChange() {
    const classeId = this.form.get('classeId')!.value;
    if (!classeId) {
      this.affectations.set([]);
      return;
    }
    this.affectationService.getByClasse(classeId).subscribe(data => this.affectations.set(data));
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.affectationService.create(this.form.getRawValue()).subscribe({
      next: () => {
        this.onClasseChange(); // rafraîchit la liste des affectations de cette classe
        this.form.patchValue({ matiereId: 0, coefficient: 1 });
      },
      error: () => this.errorMessage = "Échec de l'affectation (cette matière est peut-être déjà affectée à cette classe)."
    });
  }

  supprimer(id: number) {
    if (!confirm('Retirer cette matière de la classe ?')) return;
    this.affectationService.delete(id).subscribe({
      next: () => this.affectations.update(liste => liste.filter(a => a.id !== id))
    });
  }
}
