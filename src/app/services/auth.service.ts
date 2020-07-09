import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../models/login.form';
import { DefaultResponse } from '../models/default-response';
import { Observable } from 'rxjs';

const API = environment.URL;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  authenticate(user: LoginForm): Observable<HttpResponse<DefaultResponse>> {
    return this.http.post<DefaultResponse>(API + '/login', user, { observe: 'response' });
  }
}
