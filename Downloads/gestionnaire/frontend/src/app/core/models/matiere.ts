export interface Matiere {
  id: number;
  nom: string;
  coefficient: number;
}

export type MatiereRequest = Omit<Matiere, 'id'>;
