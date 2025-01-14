import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs';
import { catchError, throwError } from 'rxjs';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const authService = inject(AuthService);

  if (isPlatformServer(platformId)) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  let headers = req.headers.set("Content-Type", "application/json");

  if (token) {
    headers = headers.set("Authorization", `Bearer ${token}`);
  }

  const authReq = req.clone({ headers });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
        return authService.refreshToken().pipe(switchMap((newAccessToken) => {
          localStorage.setItem('token', newAccessToken);

          const updatedHeaders = req.headers.set("Authorization", `Bearer ${newAccessToken}`);
          const newRequest = req.clone({ headers: updatedHeaders });

          return next(newRequest);
        }));
      }

      return throwError(() => error);
    })
  );
};

