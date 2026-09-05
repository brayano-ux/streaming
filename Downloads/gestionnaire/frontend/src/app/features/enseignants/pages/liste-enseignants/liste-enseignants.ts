import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnseignantService } from '../../services/enseignant';
import { Enseignant } from '../../../../core/models/enseignant';

@Component({
  selector: 'app-liste-enseignants',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-enseignants.html',
  styleUrl: './liste-enseignants.css'
})
export class ListeEnseignants implements OnInit {
  private enseignantService = inject(EnseignantService);

  enseignants = signal<Enseignant[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.chargerEnseignants();
  }

  chargerEnseignants() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.enseignantService.getAll().subscribe({
      next: (data) => {
        this.enseignants.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les enseignants.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cet enseignant ?')) return;

    this.enseignantService.delete(id).subscribe({
      next: () => {
        this.enseignants.update(liste => liste.filter(e => e.id !== id));
      },
      error: () => {
        this.errorMessage.set('Échec de la suppression.');
      }
    });
  }
}
