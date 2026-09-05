export interface Classe {
  id: number;
  nom: string;
  niveau: string;
}

export type ClasseRequest = Omit<Classe, 'id'>;
