import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Eleve, EleveRequest } from '../../../core/models/eleve';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EleveService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/eleves`;

  getAll(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl);
  }

  getById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/${id}`);
  }

  create(eleve: EleveRequest): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl, eleve);
  }

  update(id: number, eleve: EleveRequest): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.apiUrl}/${id}`, eleve);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
