import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bulletin, CompletBulletinRequest } from '../../../core/models/bulletin';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BulletinService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/bulletins`;

  getBulletin(eleveId: number, trimestre: string, anneeScolaire: string): Observable<Bulletin> {
    const params = { eleveId: eleveId.toString(), trimestre, anneeScolaire };
    return this.http.get<Bulletin>(this.apiUrl, { params });
  }

  genererPdf(request: CompletBulletinRequest): Observable<Blob> {
    return this.http.post(`${this.apiUrl}/generer-pdf`, request, { responseType: 'blob' });
  }
}
