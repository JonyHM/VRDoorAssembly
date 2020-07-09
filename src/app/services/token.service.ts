import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenResponse } from '../models/token-response';
import { environment } from 'src/environments/environment';

const KEY = 'Authorization';
const REFKEY = 'Refresh';
const API = environment.URL;

@Injectable({ providedIn: 'root' })
export class TokenService {

  constructor(
    private http: HttpClient
  ) {}

  hasToken() {
    return !!this.getToken();
  }

  setRefreshToken(token: string) {
    window.localStorage.setItem(REFKEY, token);
  }

  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

  refreshToken(id: number) {
    let refresh = window.localStorage.getItem(REFKEY);

    this.http.post<TokenResponse>(`${API}/token`, {id: id, token: refresh});
  }
}
