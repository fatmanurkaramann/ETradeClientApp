import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {}

  identityCheck() {
    const token = localStorage.getItem('accessToken');
    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch (error) {
      expired = true;
    }

    _isAuthenticated = token != null && !expired;
  }

  get isAuthenticated(): boolean { //global değişkenin değerini döndürür.
    return _isAuthenticated;
  }
}
export let _isAuthenticated: boolean; //global değişken
