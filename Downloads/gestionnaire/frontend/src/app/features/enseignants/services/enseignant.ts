import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enseignant, EnseignantRequest } from '../../../core/models/enseignant';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/enseignants`;

  getAll(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.apiUrl);
  }

  getById(id: number): Observable<Enseignant> {
    return this.http.get<Enseignant>(`${this.apiUrl}/${id}`);
  }

  create(enseignant: EnseignantRequest): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrl, enseignant);
  }

  update(id: number, enseignant: EnseignantRequest): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.apiUrl}/${id}`, enseignant);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
