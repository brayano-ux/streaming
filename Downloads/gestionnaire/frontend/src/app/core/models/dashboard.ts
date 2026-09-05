export interface KpiData {
  totalStudents: number;
  totalStudentsEvolution: string;
  presenceRate: number;
  presenceRateEvolution: string;
  generalAverage: number;
  generalAverageEvolution: string;
  activeAlerts: number;
  activeAlertsEvolution: string;
}

export interface DistributionData {
  labels: string[];
  counts: number[];
}

export interface EvolutionSeries {
  label: string;
  points: number[];
}

export interface EvolutionData {
  labels: string[];
  series: EvolutionSeries[];
}

export interface FinanceData {
  totalEncaisseMois: number;
  totalDepensesMois: number;
  solde: number;
  tauxRecouvrement: number;
  elevesAJour: number;
  elevesEnRetard: number;
}

export interface DashboardStats {
  kpis: KpiData;
  distribution: DistributionData;
  evolution: EvolutionData;
  finance: FinanceData;
}
