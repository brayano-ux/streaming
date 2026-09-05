export interface AffectationMatiere {
  id: number;
  classeId: number;
  classeNom: string;
  matiereId: number;
  matiereNom: string;
  coefficient: number;
}

export interface AffectationMatiereRequest {
  classeId: number;
  matiereId: number;
  coefficient: number;
}
