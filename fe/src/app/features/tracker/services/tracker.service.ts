import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public SubmitCompany(payload: any): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/companies/`;
    return this.httpClient.post(ENDPOINT, payload);
  }

  public UpdateCompany(pid: string | number, payload: any): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/companies/${pid}/`;
    return this.httpClient.patch(ENDPOINT, payload);
  }

  public DeleteCompany(pid: string | number): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/companies/${pid}/`;
    return this.httpClient.delete(ENDPOINT);
  }

  public RetrieveCompany(pid: string | number): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/companies/${pid}/`;
    return this.httpClient.get(ENDPOINT);
  }

  public LoadCompanies(): Observable<any[]> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/companies/`;
    return this.httpClient.get<any[]>(ENDPOINT);
  }

  public SubmitEmployee(payload: any): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/employees/`;
    return this.httpClient.post(ENDPOINT, payload);
  }

  public UpdateEmployee(pid: string | number, payload: any): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/tracker/v1/employees/${pid}/`;
    return this.httpClient.patch(ENDPOINT, payload);
  }

}
