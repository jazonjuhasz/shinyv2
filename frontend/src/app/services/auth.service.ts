import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthResponse} from '../models/auth-response';
import {switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.baseURL;
  private loggedInUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  public login(userName: string, password: string): Observable<User> {
    return this.http
      .post<AuthResponse>(this.apiUrl + 'login', {userName, password})
      .pipe(
        switchMap((resp) => {
          localStorage.setItem('token', resp.token);
          return this.http.get<User>(this.apiUrl + 'profile').pipe(
            tap((user) => {
              this.loggedInUser$.next(user);
              return user;
            })
          );
        })
      );
  }

  public fetchCurrentUserOnApplication(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.http.get<User>(this.apiUrl + 'profile').subscribe(
        (user) => {
          this.loggedInUser$.next(user);
          resolve();
        },
        () => {
          resolve();
        }
      );
    });
  }

  public logout() {
    this.loggedInUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  public authenticate(): User {
    return this.loggedInUser$.getValue();
  }

  get user(): Observable<User> {
    return this.loggedInUser$;
  }
}
