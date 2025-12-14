import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  // getUserById(userId: number) {
  //   throw new Error('Method not implemented.');
  // }

 private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
  getUserById(id: number): Observable<any> {
  return this.http.get(`${this.baseUrl}/${id}`);
}
  

  addUser(users: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, users);
    
  }

  updateUser(id: number, users: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, users);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}
