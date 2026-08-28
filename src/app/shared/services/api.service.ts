import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.type';
import { Sport } from '../domain/sport.type';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000';

  getProducts(): Observable<Product[]> {
    return this.get<Product[]>('productos');
  }

  getSports(): Observable<Sport[]> {
    return this.get<Sport[]>('deportes');
  }

  get<T>(resource: string): Observable<T> {
    return this.http.get<T>(this.resourceUrl(resource));
  }

  getById<T>(resource: string, id: string | number): Observable<T> {
    return this.http.get<T>(this.resourceUrl(resource, id));
  }

  post<TResponse>(resource: string, body: unknown): Observable<TResponse> {
    return this.http.post<TResponse>(this.resourceUrl(resource), body);
  }

  put<TResponse>(resource: string, id: string | number, body: unknown): Observable<TResponse> {
    return this.http.put<TResponse>(this.resourceUrl(resource, id), body);
  }

  patch<TResponse>(resource: string, id: string | number, body: unknown): Observable<TResponse> {
    return this.http.patch<TResponse>(this.resourceUrl(resource, id), body);
  }

  delete<TResponse = unknown>(resource: string, id: string | number): Observable<TResponse> {
    return this.http.delete<TResponse>(this.resourceUrl(resource, id));
  }

  private resourceUrl(resource: string, id?: string | number): string {
    const path = resource.replace(/^\/+|\/+$/g, '');
    return id === undefined ? `${this.apiUrl}/${path}` : `${this.apiUrl}/${path}/${id}`;
  }
}
