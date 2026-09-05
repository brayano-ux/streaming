import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NoteService } from '../../services/note';
import { ClasseService } from '../../../classes/services/classe';
import { MatiereService } from '../../../matieres/services/matiere';
import { Classe } from '../../../../core/models/classe';
import { Eleve } from '../../../../core/models/eleve';
import { Matiere } from '../../../../core/models/matiere';
import { SEQUENCES } from '../../../../core/models/note';

@Component({
  selector: 'app-saisie-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './saisie-notes.html',
  styleUrl: './saisie-notes.css'
})
export class SaisieNotes implements OnInit {
  private fb = inject(FormBuilder);
  private noteService = inject(NoteService);
  private classeService = inject(ClasseService);
  private matiereService = inject(MatiereService);
  private router = inject(Router);

  sequences = SEQUENCES;
  classes = signal<Classe[]>([]);
  matieres = signal<Matiere[]>([]);
  elevesDeLaClasse = signal<Eleve[]>([]);
  loading = signal(true);
  saving = false;
  errorMessage = '';

  // Filtre de recherche sur le nom, appliqué à elevesDeLaClasse
  rechercheEleve = signal('');
  elevesFiltres = computed(() => {
    const recherche = this.rechercheEleve().toLowerCase();
    if (!recherche) return this.elevesDeLaClasse();
    return this.elevesDeLaClasse().filter(e =>
      `${e.prenom} ${e.nom}`.toLowerCase().includes(recherche)
    );
  });

  noteForm = this.fb.nonNullable.group({
    classeId: [0, Validators.required],
    eleveId: [0, [Validators.required, Validators.min(1)]],
    matiereId: [0, [Validators.required, Validators.min(1)]],
    valeur: [0, [Validators.required, Validators.min(0.01), Validators.max(20)]],    sequence: ['Séquence 1', Validators.required],
    anneeScolaire: ['2026-2027', Validators.required]
  });

  ngOnInit() {
    this.classeService.getAll().subscribe(data => this.classes.set(data));
    this.matiereService.getAll().subscribe({
      next: (data) => {
        this.matieres.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onClasseChange() {
    const classeId = this.noteForm.get('classeId')!.value;
    const anneeScolaire = this.noteForm.get('anneeScolaire')!.value;

    if (!classeId) {
      this.elevesDeLaClasse.set([]);
      return;
    }

    // Réinitialise l'élève sélectionné à chaque changement de classe
    this.noteForm.patchValue({ eleveId: 0 });
    this.rechercheEleve.set('');

    this.classeService.getEleves(classeId, anneeScolaire).subscribe({
      next: (data) => this.elevesDeLaClasse.set(data),
      error: () => this.errorMessage = "Impossible de charger les élèves de cette classe."
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) return;

    const { eleveId, matiereId, valeur, sequence, anneeScolaire } = this.noteForm.getRawValue();

    this.saving = true;
    this.noteService.create({ eleveId, matiereId, valeur, sequence, anneeScolaire }).subscribe({
      next: () => {
        this.saving = false;
        // Reste sur la page pour enchaîner la saisie d'un autre élève de la même classe
        this.noteForm.patchValue({ eleveId: 0, valeur: 0 });
        this.rechercheEleve.set('');
      },
      error: () => {
        this.saving = false;
        this.errorMessage = "Échec de l'enregistrement.";
      }
    });
  }

  terminer() {
    this.router.navigate(['/dashboard/notes']);
  }
}
