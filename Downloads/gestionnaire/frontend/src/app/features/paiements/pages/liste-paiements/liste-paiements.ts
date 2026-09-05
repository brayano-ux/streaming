import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaiementService } from '../../services/paiement';
import { Paiement } from '../../../../core/models/paiement';

@Component({
  selector: 'app-liste-paiements',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-paiements.html',
  styleUrl: './liste-paiements.css'
})
export class ListePaiements implements OnInit {
  private paiementService = inject(PaiementService);

  paiements = signal<Paiement[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  totalMontant = () => this.paiements().reduce((sum, p) => sum + p.montant, 0);

  ngOnInit() {
    this.paiementService.getAll().subscribe({
      next: (data) => {
        this.paiements.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les paiements.');
        this.loading.set(false);
      }
    });
  }
  telechargerRecu(id: number) {
    this.paiementService.telechargerRecu(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `recu-${id}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: () => this.errorMessage.set('Échec de la génération du reçu.')
    });
  }
  supprimer(id: number) {
    if (!confirm('Supprimer ce paiement ?')) return;
    this.paiementService.delete(id).subscribe({
      next: () => this.paiements.update(liste => liste.filter(p => p.id !== id)),
      error: () => this.errorMessage.set('Échec de la suppression.')
    });
  }
}
