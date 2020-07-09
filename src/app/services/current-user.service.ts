import { BehaviorSubject } from 'rxjs';
import * as jtw_decode from 'jwt-decode';
import { Injectable } from '@angular/core';

import { CurrentUser } from '../models/current-user';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API = environment.URL;

@Injectable({ providedIn: 'root' })
export class CurrentUserService {

  private userSubject = new BehaviorSubject<CurrentUser>(null);
  private userName: string;
  private role: string;
  private dateExp;

  constructor(
    private tokenService: TokenService,
    private http: HttpClient
  ) {

    // tslint:disable-next-line: no-unused-expression
    this.tokenService.hasToken() ? this.decodeAndNotify() : null;
  }

  setRefreshToken(token: string) {
    this.tokenService.setRefreshToken(token);
  }

  setToken(token: string) {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser() {
    this.decodeAndNotify();
    return this.userSubject.asObservable();
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if (token) {
      try {
        const user = jtw_decode(token) as CurrentUser;
        this.userName = user.name;
        this.role = user.role;
        this.userSubject.next(user);
        this.dateExp = new Date(user.exp * 1000);
      } catch (error) {
        console.log(error);
        
      }
    }
  }

  tokenIsValid() {
    const dataAtual = new Date();
    if (this.dateExp > dataAtual) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.tokenService.removeToken();

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: this.userSubject.value.id
      },
    };

    console.log("deslogando...");
    

    this.http.delete(`${API}/logout`, options)
      .subscribe(response => {
        console.log(response);
      });

    this.userSubject.next(null);
  }

  isLogged() {
    return this.tokenService.hasToken();
  }

  getUserName() {
    return this.userName;
  }

  getRole() {
    return this.role;
  }


  updateUser() {
    this.decodeAndNotify();
  }
}
