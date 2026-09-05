import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NoteService } from '../../services/note';
import { EleveService } from '../../../eleves/services/eleve';
import { Note } from '../../../../core/models/note';
import { Eleve } from '../../../../core/models/eleve';

@Component({
  selector: 'app-details-notes-eleve',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details-notes-eleve.html',
  styleUrl: './details-notes-eleve.css'
})
export class DetailsNotesEleve implements OnInit {
  private noteService = inject(NoteService);
  private eleveService = inject(EleveService);
  private route = inject(ActivatedRoute);

  eleve = signal<Eleve | null>(null);
  notes = signal<Note[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  // Regroupe les notes par matière, pour un affichage clair
  notesParMatiere = signal<{ matiere: string; coefficient: number; notes: Note[] }[]>([]);

  ngOnInit() {
    const eleveId = Number(this.route.snapshot.paramMap.get('eleveId'));

    this.eleveService.getById(eleveId).subscribe({
      next: (data) => this.eleve.set(data),
      error: () => this.errorMessage.set("Impossible de charger cet élève.")
    });

    this.noteService.getByEleve(eleveId).subscribe({
      next: (data) => {
        this.notes.set(data);
        this.regrouperParMatiere(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les notes.');
        this.loading.set(false);
      }
    });
  }

  private regrouperParMatiere(notes: Note[]) {
    const groupes = new Map<string, { matiere: string; coefficient: number; notes: Note[] }>();

    for (const note of notes) {
      if (!groupes.has(note.matiereNom)) {
        groupes.set(note.matiereNom, { matiere: note.matiereNom, coefficient: note.coefficient, notes: [] });
      }
      groupes.get(note.matiereNom)!.notes.push(note);
    }

    this.notesParMatiere.set(Array.from(groupes.values()));
  }
}
