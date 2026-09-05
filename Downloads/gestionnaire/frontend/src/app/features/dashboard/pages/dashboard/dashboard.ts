import { Component, OnInit, ElementRef, ViewChild, signal, computed, inject, afterNextRender, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { TokenService } from '../../../../core/services/token';
import { DashboardService } from '../../services/dashboard';
import {FinanceData, KpiData} from '../../../../core/models/dashboard';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('donutCanvas') donutCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('lineCanvas') lineCanvas!: ElementRef<HTMLCanvasElement>;
  finance = signal<FinanceData | null>(null);
  private tokenService = inject(TokenService);
  private dashboardService = inject(DashboardService);
  private injector = inject(Injector);

  userName = signal<string>(this.tokenService.getUser()?.nom || 'Utilisateur');
  roleSelected = signal<string>('Administrateur');
  activePeriod = signal<'semestre' | 'annee'>('semestre');
  loading = signal<boolean>(true);
  errorMessage = signal<string>('');

  kpis = signal<KpiData | null>(null);
  totalDistributionStudents = signal<number>(0);

  currentDate = computed(() => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date().toLocaleDateString('fr-FR', options);
  });

  private donutChart!: Chart;
  private lineChart!: Chart;

  ngOnInit(): void {
    this.chargerDonnees();
  }

  chargerDonnees(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.dashboardService.getStats(this.activePeriod()).subscribe({next: (data) => {
        this.kpis.set(data.kpis);
        this.finance.set(data.finance);
        this.totalDistributionStudents.set(data.distribution.counts.reduce((a, b) => a + b, 0));
        this.loading.set(false);

        afterNextRender(() => {
          this.genererDonutChart(data.distribution.labels, data.distribution.counts);
          this.genererLineChart(data.evolution.labels, data.evolution.series);
        }, { injector: this.injector });
      },
      error: () => {
        this.errorMessage.set('Erreur lors de la récupération des données du tableau de bord.');
        this.loading.set(false);
      }
    });
  }

  setPeriod(period: 'semestre' | 'annee'): void {
    this.activePeriod.set(period);
    this.chargerDonnees();
  }

  private genererDonutChart(labels: string[], dataCounts: number[]): void {
    if (!this.donutCanvas) return;
    if (this.donutChart) this.donutChart.destroy();

    this.donutChart = new Chart(this.donutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: dataCounts,
          backgroundColor: ['#1e3a8a', '#10b981', '#f59e0b', '#ef4444'],
          borderWidth: 4,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: '70%'
      }
    });
  }

  private genererLineChart(labels: string[], series: { label: string; points: number[] }[]): void {
    if (!this.lineCanvas) return;
    if (this.lineChart) this.lineChart.destroy();

    const colors = ['#10b981', '#ef4444', '#1e3a8a'];
    const datasets = series.map((s, index) => ({
      label: s.label,
      data: s.points,
      borderColor: colors[index % colors.length],
      backgroundColor: colors[index % colors.length],
      tension: 0.4,
      pointRadius: 4
    }));

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: { labels: labels, datasets: datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: { min: 0, max: 20 },
          x: { grid: { display: false } }
        }
      }
    });
  }
}
