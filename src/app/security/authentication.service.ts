import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";


interface AuthenticationResponse {
  status: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  redirectUrl = '/'
  constructor() { }

  static isLoggedIn() {
    const token = AuthenticationService.getToken();
    return !!token && !AuthenticationService.isTokenExpired(token);
  }

  static isTokenExpired(token: string) {
    return false
  }

  static setToken(idToken: string) {
    sessionStorage.setItem('id_token', idToken);
  }

  static getToken() {
    return sessionStorage.getItem('id_token');
  }

  static logout() {
    sessionStorage.removeItem('id_token');
  }

  loginWithRole(username: string, password: string, role: string): Observable<AuthenticationResponse> {
    const response: AuthenticationResponse = {
      status: true, message: 'HTTP 200', token: 'atoken'
    };
    AuthenticationService.setToken('token');
    return of(response);
  }

}
