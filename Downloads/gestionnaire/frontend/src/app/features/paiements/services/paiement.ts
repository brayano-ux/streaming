import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiement, PaiementRequest } from '../../../core/models/paiement';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaiementService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/paiements`;

  getAll(): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(this.apiUrl);
  }

  create(paiement: PaiementRequest): Observable<Paiement> {
    return this.http.post<Paiement>(this.apiUrl, paiement);
  }
  telechargerRecu(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/recu-pdf`, { responseType: 'blob' });
  }
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
