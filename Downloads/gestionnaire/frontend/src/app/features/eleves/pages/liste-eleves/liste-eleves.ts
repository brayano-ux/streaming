import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EleveService } from '../../services/eleve';
import { Eleve } from '../../../../core/models/eleve';

@Component({
  selector: 'app-liste-eleves',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-eleves.html',
  styleUrl: './liste-eleves.css'
})
export  class ListeEleves implements OnInit {
  private eleveService = inject(EleveService);
  eleves = signal<Eleve[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.chargerEleves();
  }

  chargerEleves() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.eleveService.getAll().subscribe({
      next: (data) => {
        this.eleves.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger la liste des élèves.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cet élève ?')) return;

    this.eleveService.delete(id).subscribe({
      next: () => {
        this.eleves.update(liste => liste.filter(e => e.id !== id));
      },
      error: () => {
        this.errorMessage.set('Échec de la suppression.');
      }
    });
  }
}
