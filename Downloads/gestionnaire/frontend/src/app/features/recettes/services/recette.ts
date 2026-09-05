import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recette, RecetteRequest } from '../../../core/models/recette';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RecetteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/recettes`;

  getAll(): Observable<Recette[]> {
    return this.http.get<Recette[]>(this.apiUrl);
  }

  create(recette: RecetteRequest): Observable<Recette> {
    return this.http.post<Recette>(this.apiUrl, recette);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
