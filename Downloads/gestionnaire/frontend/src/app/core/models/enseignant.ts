export interface Enseignant {
  id: number;
  nom: string;
  prenom: string;
  matiere: string;
  telephone: string;
  email: string;
}

export type EnseignantRequest = Omit<Enseignant, 'id'>;
