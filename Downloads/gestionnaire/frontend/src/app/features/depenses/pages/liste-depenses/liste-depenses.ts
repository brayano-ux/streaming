import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DepenseService } from '../../services/depense';
import { Depense } from '../../../../core/models/depense';

@Component({
  selector: 'app-liste-depenses',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-depenses.html',
  styleUrl: './liste-depenses.css'
})
export class ListeDepenses implements OnInit {
  private depenseService = inject(DepenseService);

  depenses = signal<Depense[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  totalMontant = () => this.depenses().reduce((sum, d) => sum + d.montant, 0);

  ngOnInit() {
    this.depenseService.getAll().subscribe({
      next: (data) => {
        this.depenses.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les dépenses.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette dépense ?')) return;
    this.depenseService.delete(id).subscribe({
      next: () => this.depenses.update(liste => liste.filter(d => d.id !== id)),
      error: () => this.errorMessage.set('Échec de la suppression.')
    });
  }
}
