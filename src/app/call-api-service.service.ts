import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallApiServiceService {

   private apiUrl = 'http://localhost:8081/';

  constructor(private http: HttpClient) {}

   crearUsuario(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl + 'users', data, { headers });
  }

  login(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(this.apiUrl + 'api/auth/login', data, { headers });
  }
  
  actualizarUsuario(id: string, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // ✅ Incluimos token
    });
  
    return this.http.put(this.apiUrl + `users/${id}`, data, { headers });
  }
  
}
