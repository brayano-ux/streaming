export interface Recette {
  id: number;
  libelle: string;
  montant: number;
  source: string;
  dateRecette: string;
}

export type RecetteRequest = Omit<Recette, 'id'>;
