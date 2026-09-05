import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InscriptionService } from '../../services/inscription';
import { Inscription } from '../../../../core/models/inscription';

@Component({
  selector: 'app-liste-inscriptions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-inscriptions.html',
  styleUrl: './liste-inscriptions.css'
})
export class ListeInscriptions implements OnInit {
  private inscriptionService = inject(InscriptionService);

  inscriptions = signal<Inscription[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.chargerInscriptions();
  }

  chargerInscriptions() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.inscriptionService.getAll().subscribe({
      next: (data) => {
        this.inscriptions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les inscriptions.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette inscription ?')) return;

    this.inscriptionService.delete(id).subscribe({
      next: () => {
        this.inscriptions.update(liste => liste.filter(i => i.id !== id));
      },
      error: () => {
        this.errorMessage.set('Échec de la suppression.');
      }
    });
  }
}
