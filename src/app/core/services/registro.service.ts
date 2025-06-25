import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  getToken() {
    return this.http.post(`${this.apiUrl}/token`, {});
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/clientes`, data);
  }
}
