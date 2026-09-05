import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EleveService } from '../../services/eleve';
import { Eleve } from '../../../../core/models/eleve';

@Component({
  selector: 'app-details-eleve',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details-eleve.html',
  styleUrl: './details-eleve.css',
})
export class DetailsEleve implements OnInit {
  private eleveService = inject(EleveService);
  private route = inject(ActivatedRoute);

  eleve = signal<Eleve | null>(null);
  loading = signal(true);
  errorMessage = signal('');

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eleveService.getById(id).subscribe({
      next: (data) => {
        this.eleve.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set("Impossible de charger cet élève.");
        this.loading.set(false);
      }
    });
  }
}
