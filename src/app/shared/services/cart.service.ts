import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, forkJoin, of, switchMap, tap } from 'rxjs';
import { Product } from '../domain/product.type';
import { CartItem } from '../domain/cart-item.type';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly api = inject(ApiService);

  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().length);
  readonly isLoading = signal(false);
  readonly hasError = signal(false);

  load(): void {
    this.isLoading.set(true);
    this.api.getCart().subscribe({
      next: (items) => {
        this.items.set(items);
        this.hasError.set(false);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }

  add(product: Product): void {
    this.api.addToCart(product).subscribe({
      next: (item) => {
        this.items.update((items) => [...items, item]);
        this.hasError.set(false);
      },
      error: () => this.hasError.set(true),
    });
  }

  remove(item: CartItem): void {
    this.api.removeFromCart(item.id).subscribe({
      next: () =>
        this.items.update((items) => items.filter(({ id }) => id.toString() !== item.id.toString())),
      error: () => this.hasError.set(true),
    });
  }

  clear(): Observable<void[]> {
    const requests = this.items().map((item) => this.api.removeFromCart(item.id));
    return (requests.length ? forkJoin(requests) : of([])).pipe(tap(() => this.items.set([])));
  }

  checkout(purchase: unknown): Observable<void[]> {
    return this.api.createPurchase(purchase).pipe(switchMap(() => this.clear()));
  }
}
