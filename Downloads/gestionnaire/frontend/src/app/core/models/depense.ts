export interface Depense {
  id: number;
  libelle: string;
  montant: number;
  categorie: string;
  dateDepense: string;
}

export type DepenseRequest = Omit<Depense, 'id'>;
