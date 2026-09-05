import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AffectationMatiere, AffectationMatiereRequest } from '../../../core/models/affectation';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AffectationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/affectations`;

  getByClasse(classeId: number): Observable<AffectationMatiere[]> {
    return this.http.get<AffectationMatiere[]>(this.apiUrl, { params: { classeId: classeId.toString() } });
  }

  create(affectation: AffectationMatiereRequest): Observable<AffectationMatiere> {
    return this.http.post<AffectationMatiere>(this.apiUrl, affectation);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
