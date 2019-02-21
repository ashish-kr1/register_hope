import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  constructor(private http: Http) { }

  registerUser(user): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/signup', user, { headers: headers })
      .pipe(map(res => res.json()));
  }

  authenticateuser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/login', user, { headers: headers })
      .pipe(map(res => res.json()));
  }


  getProfile() {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/profile', { headers: headers })
      .pipe(map(res => res.json()));
  }
  forgetPassword(data) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/forgetPassword', data, { headers: headers })
      .pipe(map(res => res['data']));
  }
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  checkStorage() {
    if (window.localStorage.length == null) {
      return true;
    }
    else {
      return false;
    }
  }
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }


  loggedIn() {
    return this.authToken;
  }


  LogOut() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }



}

