import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InscriptionService } from '../../services/inscription';
import { EleveService } from '../../../eleves/services/eleve';
import { ClasseService } from '../../../classes/services/classe';
import { Eleve } from '../../../../core/models/eleve';
import { Classe } from '../../../../core/models/classe';

@Component({
  selector: 'app-nouvelle-inscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouvelle-inscription.html',
  styleUrl: './nouvelle-inscription.css'
})
export class NouvelleInscription implements OnInit {
  private fb = inject(FormBuilder);
  private inscriptionService = inject(InscriptionService);
  private eleveService = inject(EleveService);
  private classeService = inject(ClasseService);
  private router = inject(Router);

  eleves = signal<Eleve[]>([]);
  classes = signal<Classe[]>([]);
  loading = signal(true);
  saving = false;
  errorMessage = '';

  inscriptionForm = this.fb.nonNullable.group({
    eleveId: [0, Validators.required],
    classeId: [0, Validators.required],
    anneeScolaire: ['2026-2027', Validators.required],
    dateInscription: ['', Validators.required],
    redoublant: [false]

  });

  ngOnInit() {
    this.eleveService.getAll().subscribe(data => this.eleves.set(data));
    this.classeService.getAll().subscribe({
      next: (data) => {
        this.classes.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSubmit() {
    if (this.inscriptionForm.invalid) return;

    this.saving = true;
    this.inscriptionService.create(this.inscriptionForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/inscriptions']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'inscription.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/inscriptions']);
  }
}
