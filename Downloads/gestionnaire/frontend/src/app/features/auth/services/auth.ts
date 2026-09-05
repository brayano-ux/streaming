import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../../../core/models/user';
import { TokenService } from '../../../core/services/token';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  login(email: string, motDePasse: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      motDePasse
    }).pipe(
      tap(response => {
        this.tokenService.setSession(response.token, response.user);
        this.router.navigate(['/dashboard']);
      })
    );
  }
}
