export interface Paiement {
  id: number;
  eleveId: number;
  eleveNomComplet: string;
  montant: number;
  motif: string;
  modePaiement: string;
  datePaiement: string;
}

export interface PaiementRequest {
  eleveId: number;
  montant: number;
  motif: string;
  modePaiement: string;
  datePaiement: string;
}
