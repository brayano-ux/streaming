export interface LigneMatiere {
  matiere: string;
  note: number;
  coefficient: number;
  total: number;
  moyenneClasseMatiere: number;
  appreciation: string;
  enseignant: string;
}

export interface Bulletin {
  eleveId: number;
  eleveNomComplet: string;
  matricule: string;
  sexe: string;
  dateNaissance: string;
  lieuNaissance: string;
  classeNom: string;
  effectifClasse: number;
  redoublant: boolean;
  professeurPrincipal: string;
  trimestre: string;
  anneeScolaire: string;
  matieres: LigneMatiere[];
  totalPoints: number;
  totalCoefficients: number;
  moyenneGenerale: number;
  rang: number;
  moyennePlusForte: number;
  moyennePlusFaible: number;
  moyenneClasse: number;
}

export interface CompletBulletinRequest {
  eleveId: number;
  trimestre: string;
  anneeScolaire: string;
  absencesJustifiees: number;
  absencesNonJustifiees: number;
  retards: number;
  discipline: string;
  appreciationGenerale: string;
  decision: string;
}
