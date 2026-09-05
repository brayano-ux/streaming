import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClasseService } from '../../services/classe';
import { Classe } from '../../../../core/models/classe';

@Component({
  selector: 'app-liste-classes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './liste-classes.html',
  styleUrl: './liste-classes.css'
})
export class ListeClasses implements OnInit {
  private classeService = inject(ClasseService);

  classes = signal<Classe[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    this.chargerClasses();
  }

  chargerClasses() {
    this.loading.set(true);
    this.errorMessage.set('');

    this.classeService.getAll().subscribe({
      next: (data) => {
        this.classes.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les classes.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette classe ?')) return;

    this.classeService.delete(id).subscribe({
      next: () => {
        this.classes.update(liste => liste.filter(c => c.id !== id));
      },
      error: () => {
        this.errorMessage.set('Échec de la suppression.');
      }
    });
  }
}
