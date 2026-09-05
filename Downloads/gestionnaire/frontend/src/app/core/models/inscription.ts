export interface Inscription {
  id: number;
  eleveId: number;
  eleveNomComplet: string;
  classeId: number;
  classeNom: string;
  anneeScolaire: string;
  dateInscription: string;
}

export interface InscriptionRequest {
  eleveId: number;
  classeId: number;
  anneeScolaire: string;
  dateInscription: string;
}
