import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../domain/product.type';
import { Sport } from '../domain/sport.type';
import { CartItem } from '../domain/cart-item.type';

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

  getCart(): Observable<CartItem[]> {
    return this.get<CartItem[]>('carrito');
  }

  addToCart(product: Product): Observable<CartItem> {
    return this.http.post<CartItem>(this.resourceUrl('carrito'), { producto: product });
  }

  removeFromCart(id: number | string): Observable<void> {
    return this.http.delete<void>(this.resourceUrl('carrito', id));
  }

  createPurchase(purchase: unknown): Observable<unknown> {
    return this.http.post<unknown>(this.resourceUrl('compras'), purchase);
  }

  get<T>(resource: string): Observable<T> {
    return this.http.get<T>(this.resourceUrl(resource));
  }

  private resourceUrl(resource: string, id?: number | string): string {
    const path = resource.replace(/^\/+|\/+$/g, '');
    return id === undefined ? `${this.apiUrl}/${path}` : `${this.apiUrl}/${path}/${id}`;
  }
}
