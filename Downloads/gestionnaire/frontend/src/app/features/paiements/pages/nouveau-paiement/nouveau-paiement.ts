import { Component, inject, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { PaiementService } from '../../services/paiement';
import { EleveService } from '../../../eleves/services/eleve';
import { Eleve } from '../../../../core/models/eleve';

@Component({
  selector: 'app-nouveau-paiement',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './nouveau-paiement.html',
  styleUrl: './nouveau-paiement.css'
})
export class NouveauPaiement implements OnInit {
  private fb = inject(FormBuilder);
  private paiementService = inject(PaiementService);
  private eleveService = inject(EleveService);
  private router = inject(Router);

  eleves = signal<Eleve[]>([]);
  loading = signal(true);
  saving = false;
  errorMessage = '';

  paiementForm = this.fb.nonNullable.group({
    eleveId: [0, Validators.required],
    montant: [0, [Validators.required, Validators.min(1)]],
    motif: ['', Validators.required],
    modePaiement: ['Espèces', Validators.required],
    datePaiement: ['', Validators.required]
  });

  ngOnInit() {
    this.eleveService.getAll().subscribe({
      next: (data) => {
        this.eleves.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSubmit() {
    if (this.paiementForm.invalid) return;

    this.saving = true;
    this.paiementService.create(this.paiementForm.getRawValue()).subscribe({
      next: () => this.router.navigate(['/dashboard/paiements']),
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }

  annuler() {
    this.router.navigate(['/dashboard/paiements']);
  }
}
