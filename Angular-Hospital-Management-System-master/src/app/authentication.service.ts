import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  
  authenticate(username: string, password: string) {
    if (username === "Rishi" && password === "Prem@12") {
      sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  baseUrl="http://localhost:3000";
  // login(request: any): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}/getBookingDetails/?bookingId=${id}`);
  // }

  register(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register`, request);
  }

  login(request: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, request);
  }

}
