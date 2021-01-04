import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaderResponse, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User, UserCreate, UserResponse} from '../models/user';
import {FilterParamsModel} from '../models/filter-params-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string = environment.baseURL;

  constructor(private http: HttpClient) {
  }

  public fetchUsersByFilter(requestParams: FilterParamsModel): Observable<UserResponse> {
    let params = new HttpParams();
    if (requestParams != null) {
      Object.keys(requestParams).forEach(key => {
        const value = requestParams[key];
        if (value != null) {
          params = params.set(key, value.toString());
        }
      });
    }
    return this.http.get<UserResponse>(environment.baseURL + 'user', {
      params
    });
  }

  public create(user: User): Observable<void> {
    const httpOptions: object = {responseType: 'text'};
    return this.http.post<void>(this.apiUrl + 'user', user);
  }

  public update(id: number, user: User): Observable<void> {
    const httpOptions: object = {responseType: 'text'};
    return this.http.put<void>(this.apiUrl + `user/${id}`, user, httpOptions);
  }

  public delete(id: number) {
    return this.http.delete(this.apiUrl + `user/${id}`);
  }
}
