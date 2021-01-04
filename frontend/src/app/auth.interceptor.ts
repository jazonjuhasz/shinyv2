import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {AuthService} from './services/auth.service';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');
    const newRequest = !!token ? request.clone({setHeaders: {Authorization: `Bearer ${token}`}}) : request;
    return next.handle(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
