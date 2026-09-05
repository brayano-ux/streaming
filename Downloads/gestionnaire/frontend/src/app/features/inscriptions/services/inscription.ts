import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inscription, InscriptionRequest } from '../../../core/models/inscription';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class InscriptionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/inscriptions`;

  getAll(): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(this.apiUrl);
  }

  create(inscription: InscriptionRequest): Observable<Inscription> {
    return this.http.post<Inscription>(this.apiUrl, inscription);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
