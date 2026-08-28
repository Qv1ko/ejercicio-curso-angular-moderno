import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../shared/services/api.service';
import { Product } from '../shared/domain/product.type';
import { Sport } from '../shared/domain/sport.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, RouterLink],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly products = signal<Product[]>([]);
  protected readonly sports = signal<Sport[]>([]);
  protected readonly selectedSportId = signal<number | null>(null);
  protected readonly cartCount = signal(0);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);

  protected readonly filteredProducts = computed(() => {
    const sportId = this.selectedSportId();
    return sportId === null
      ? this.products()
      : this.products().filter((product) => product.categoria_id === sportId);
  });

  ngOnInit(): void {
    this.api
      .getProducts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
        },
      });

    this.api
      .getSports()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({ next: (sports) => this.sports.set(sports) });
  }

  protected selectSport(sportId: number | null): void {
    this.selectedSportId.set(sportId);
  }

  protected addToCart(product: Product): void {
    if (product.stock > 0) {
      this.cartCount.update((count) => count + 1);
    }
  }
}
