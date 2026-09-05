import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classe, ClasseRequest } from '../../../core/models/classe';
import { environment } from '../../../../environments/environment';
import { Eleve } from '../../../core/models/eleve';

@Injectable({ providedIn: 'root' })
export class ClasseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/classes`;

  getAll(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.apiUrl);
  }
  getEleves(classeId: number, anneeScolaire: string): Observable<Eleve[]> {
    const params = { anneeScolaire };
    return this.http.get<Eleve[]>(`${this.apiUrl}/${classeId}/eleves`, { params });
  }
  getById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.apiUrl}/${id}`);
  }

  create(classe: ClasseRequest): Observable<Classe> {
    return this.http.post<Classe>(this.apiUrl, classe);
  }

  update(id: number, classe: ClasseRequest): Observable<Classe> {
    return this.http.put<Classe>(`${this.apiUrl}/${id}`, classe);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
