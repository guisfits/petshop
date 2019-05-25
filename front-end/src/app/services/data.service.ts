import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductModel } from '../models/product,model';
import { Security } from '../utils/security.util';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public url = "http://localhost:3000/v1"

  constructor(private http: HttpClient) { }

  public composeHeader() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return headers;
  }

  getProducts() {
    return this.http.get<ProductModel[]>(`${this.url}/products`);
  }

  create(data) {
    return this.http.post(`${this.url}/accounts`, data);
  }

  authenticate(data) {
    return this.http.post<ProductModel[]>(`${this.url}/accounts/authenticate`, data);
  }

  refreshToken() {
    return this.http.post(
      `${this.url}/accounts/refresh-token`,
      null,
      { headers: this.composeHeader() }
    );
  }

  resetPassword(data) {
    return this.http.post(`${this.url}/accounts/reset-password`, data);
  }

  getProfile() {
    return this.http.get(`${this.url}/accounts`, { headers: this.composeHeader() });
  }

  updateProfile(data) {
    return this.http.put(`${this.url}/accounts/`, data, { headers: this.composeHeader() });
  }
}
