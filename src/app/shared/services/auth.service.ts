import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api/auth';
  router = inject(Router);
  http = inject(HttpClient);

  refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      this.logOut();
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http.post<{ refreshToken: string }>(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      map((res) => res.refreshToken),
      tap((newAccessToken) => {
        localStorage.setItem('token', newAccessToken);
      }),
      catchError(() => {
        this.logOut();
        return throwError(() => new Error('Failed to refresh token'));
      })
    );
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  login(email: string, password: string) {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      })
    );
  }

}
