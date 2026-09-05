import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, NoteRequest } from '../../../core/models/note';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/notes`;

  getAll(filtres?: { classeId?: number; sequence?: string; nom?: string }): Observable<Note[]> {
    const params: Record<string, string> = {};
    if (filtres?.classeId) params['classeId'] = filtres.classeId.toString();
    if (filtres?.sequence) params['sequence'] = filtres.sequence;
    if (filtres?.nom) params['nom'] = filtres.nom;

    return this.http.get<Note[]>(this.apiUrl, { params });
  }

  getByEleve(eleveId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${this.apiUrl}/eleve/${eleveId}`);
  }

  create(note: NoteRequest): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
