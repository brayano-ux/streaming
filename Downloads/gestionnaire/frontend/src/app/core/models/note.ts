export interface Note {
  id: number;
  eleveId: number;
  eleveNomComplet: string;
  classeNom: string;
  matiereId: number;
  matiereNom: string;
  coefficient: number;
  valeur: number;
  sequence: string;
  anneeScolaire: string;
}

export interface NoteRequest {
  eleveId: number;
  matiereId: number;
  valeur: number;
  sequence: string;
  anneeScolaire: string;
}

export const SEQUENCES = ['Séquence 1', 'Séquence 2', 'Séquence 3', 'Séquence 4', 'Séquence 5'];
