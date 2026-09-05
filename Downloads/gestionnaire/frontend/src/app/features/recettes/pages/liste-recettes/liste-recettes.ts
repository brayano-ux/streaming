import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecetteService } from '../../services/recette';
import { Recette } from '../../../../core/models/recette';

@Component({
  selector: 'app-liste-recettes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-recettes.html',
  styleUrl: './liste-recettes.css'
})
export class ListeRecettes implements OnInit {
  private recetteService = inject(RecetteService);

  recettes = signal<Recette[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  totalMontant = () => this.recettes().reduce((sum, r) => sum + r.montant, 0);

  ngOnInit() {
    this.recetteService.getAll().subscribe({
      next: (data) => {
        this.recettes.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les recettes.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette recette ?')) return;
    this.recetteService.delete(id).subscribe({
      next: () => this.recettes.update(liste => liste.filter(r => r.id !== id)),
      error: () => this.errorMessage.set('Échec de la suppression.')
    });
  }
}
