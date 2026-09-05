import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BulletinService } from '../../services/bulletin';
import { EleveService } from '../../../eleves/services/eleve';
import { Eleve } from '../../../../core/models/eleve';
import { Bulletin } from '../../../../core/models/bulletin';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-liste-bulletins',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule ],
  templateUrl: './liste-bulletins.html',
  styleUrl: './liste-bulletins.css'
})
export class ListeBulletins implements OnInit {
  private fb = inject(FormBuilder);
  private bulletinService = inject(BulletinService);
  private eleveService = inject(EleveService);

  eleves = signal<Eleve[]>([]);
  bulletin = signal<Bulletin | null>(null);
  loading = false;
  generatingPdf = false;
  errorMessage = '';

  rechercheForm = this.fb.nonNullable.group({
    eleveId: [0, Validators.required],
    trimestre: ['Trimestre 1', Validators.required],
    anneeScolaire: ['2026-2027', Validators.required]
  });

  complementForm = this.fb.nonNullable.group({
    absencesJustifiees: [0],
    absencesNonJustifiees: [0],
    retards: [0],
    discipline: ['Aucune sanction.'],
    appreciationGenerale: [''],
    decision: ['ADMIS(E) EN CLASSE SUPÉRIEURE']
  });

  ngOnInit() {
    this.eleveService.getAll().subscribe(data => this.eleves.set(data));
  }

  genererApercu() {
    if (this.rechercheForm.invalid) return;

    this.loading = true;
    this.errorMessage = '';
    this.bulletin.set(null);

    const { eleveId, trimestre, anneeScolaire } = this.rechercheForm.getRawValue();

    this.bulletinService.getBulletin(eleveId, trimestre, anneeScolaire).subscribe({
      next: (data) => {
        this.bulletin.set(data);
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Impossible de générer ce bulletin (vérifie que l'élève a des notes et une inscription pour cette période).";
        this.loading = false;
      }
    });
  }

  telechargerPdf() {
    const { eleveId, trimestre, anneeScolaire } = this.rechercheForm.getRawValue();
    const complements = this.complementForm.getRawValue();

    this.generatingPdf = true;

    this.bulletinService.genererPdf({
      eleveId, trimestre, anneeScolaire, ...complements
    }).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bulletin-${this.bulletin()?.eleveNomComplet ?? 'eleve'}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        this.generatingPdf = false;
      },
      error: () => {
        this.errorMessage = "Échec de la génération du PDF.";
        this.generatingPdf = false;
      }
    });
  }
}
