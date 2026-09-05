import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NoteService } from '../../services/note';
import { ClasseService } from '../../../classes/services/classe';
import { Note, SEQUENCES } from '../../../../core/models/note';
import { Classe } from '../../../../core/models/classe';

@Component({
  selector: 'app-liste-notes',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './liste-notes.html',
  styleUrl: './liste-notes.css'
})
export class ListeNotes implements OnInit {
  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);
  private classeService = inject(ClasseService);

  sequences = SEQUENCES;
  classes = signal<Classe[]>([]);
  notes = signal<Note[]>([]);
  loading = signal(true);
  errorMessage = signal('');

  filtreForm = this.fb.nonNullable.group({
    classeId: [0],
    sequence: [''],
    nom: ['']
  });

  ngOnInit() {
    this.classeService.getAll().subscribe(data => this.classes.set(data));
    this.chargerNotes();
  }

  chargerNotes() {
    this.loading.set(true);
    this.errorMessage.set('');

    const { classeId, sequence, nom } = this.filtreForm.getRawValue();

    this.noteService.getAll({
      classeId: classeId || undefined,
      sequence: sequence || undefined,
      nom: nom || undefined
    }).subscribe({
      next: (data) => {
        this.notes.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Impossible de charger les notes.');
        this.loading.set(false);
      }
    });
  }

  supprimer(id: number) {
    if (!confirm('Supprimer cette note ?')) return;
    this.noteService.delete(id).subscribe({
      next: () => this.notes.update(liste => liste.filter(n => n.id !== id)),
      error: () => this.errorMessage.set('Échec de la suppression.')
    });
  }
}
