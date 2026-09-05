import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depense, DepenseRequest } from '../../../core/models/depense';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DepenseService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/depenses`;

  getAll(): Observable<Depense[]> {
    return this.http.get<Depense[]>(this.apiUrl);
  }

  create(depense: DepenseRequest): Observable<Depense> {
    return this.http.post<Depense>(this.apiUrl, depense);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
