import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matiere, MatiereRequest } from '../../../core/models/matiere';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MatiereService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/matieres`;

  getAll(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.apiUrl);
  }

  create(matiere: MatiereRequest): Observable<Matiere> {
    return this.http.post<Matiere>(this.apiUrl, matiere);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
