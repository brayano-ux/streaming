export interface Eleve {
  id: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  sexe: 'M' | 'F';
  nomParent: string;
  telephoneParent: string;
  matricule: string;
  lieuNaissance: string;
}

export type EleveRequest = Omit<Eleve, 'id'>;
