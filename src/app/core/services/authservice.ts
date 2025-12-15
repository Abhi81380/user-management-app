import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  // private apiUrl = 'http://localhost:3000/api/login';
  private apiUrl = 'https://user-management-backend-tepl.onrender.com/api/login';

  constructor(private http: HttpClient) {}


  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((res: any) => {
        // Store token & role
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getRole(): string | null {
    return localStorage.getItem('role');
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('sessionExpired');
  }
}
