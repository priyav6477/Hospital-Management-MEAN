import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  
  
  private baseUrl = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  getDoctorslist(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/users/Doctor`);
  }

  getPatients(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/users/Patient`);
  }

  getPatientReport(id:any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/reports/patient/${id}`);
  }

  addReport(request: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/addReport`, request);
  }

  updateReport(request:any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateReports/status`, request);
  }

  getReportByStatus(status:any): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/reports/status/${status}`);
  }

  getAllReports(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/reports`);
  }

}
