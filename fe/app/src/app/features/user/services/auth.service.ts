import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public LoadGroups(): Observable<any[]> {
    const ENDPOINT = `${environment.apiUrl}/user/v1/groups/`;
    return this.httpClient.get<any[]>(ENDPOINT);
  }

  public LoadUsers(): Observable<any[]> {
    const ENDPOINT = `${environment.apiUrl}/user/v1/users/`;
    return this.httpClient.get<any[]>(ENDPOINT);
  }

  public SignUp(payload: any = {}): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/user/v1/users/signup/`;
    return this.httpClient.post<any>(ENDPOINT, payload);
  }

  public Authentication(payload: { username: string, password: string }): Observable<any> {
    const ENDPOINT = `${environment.apiUrl}/user/v1/authentication/`;
    return this.httpClient.post(ENDPOINT, payload);
  }

  public SaveToken(payload: any): void {
    localStorage.setItem('USER_TOKEN', JSON.stringify(payload));
  }

  public GetToken(): any {
    const TOKEN = localStorage.getItem('USER_TOKEN');
    return TOKEN ? JSON.parse(TOKEN) : null;
  }

  public get IsAuthenticated(): boolean {
    return this.GetToken() !== null;
  }

  public get Roles(): string[] {
    if (this.GetToken() !== null) {
      return this.GetToken().groups;
    }

    return [];
  }

  public ClearToken(): void {
    localStorage.clear();
  }

  public LogOut(): Observable<any> {
    this.ClearToken();
    return of('OK!');
  }

}
