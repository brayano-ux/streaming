import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../../../core/models/dashboard';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/dashboard`;

  getStats(period: 'semestre' | 'annee'): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.apiUrl}/stats`, {
      params: { period }
    });
  }
}
