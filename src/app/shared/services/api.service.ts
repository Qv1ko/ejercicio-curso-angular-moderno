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

  private resourceUrl(resource: string): string {
    const path = resource.replace(/^\/+|\/+$/g, '');
    return `${this.apiUrl}/${path}`;
  }
}
