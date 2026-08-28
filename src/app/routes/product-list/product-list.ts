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
import { ApiService } from '../../shared/services/api.service';
import { CartService } from '../../shared/services/cart.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Product } from '../../shared/domain/product.type';
import { Sport } from '../../shared/domain/sport.type';
import { Header } from '../../core/components/header/header';
import { ProductCard } from '../../shared/ui/product-card/product-card';
import { StatusMessage } from '../../shared/ui/status-message/status-message';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Header, ProductCard, StatusMessage],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList implements OnInit {
  private readonly api = inject(ApiService);
  protected readonly cart = inject(CartService);
  protected readonly notification = inject(NotificationService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly products = signal<Product[]>([]);
  protected readonly sports = signal<Sport[]>([]);
  protected readonly selectedSportId = signal<number | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);

  protected readonly filteredProducts = computed(() => {
    const sportId = this.selectedSportId();
    return sportId === null
      ? this.products()
      : this.products().filter((product) => product.categoria_id.toString() === sportId.toString());
  });

  ngOnInit(): void {
    this.cart.load();
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
      this.products.update((products) =>
        products.map((current) =>
          current.id === product.id ? { ...current, stock: current.stock - 1 } : current,
        ),
      );
      this.cart.add(product).subscribe({
        error: () =>
          this.products.update((products) =>
            products.map((current) =>
              current.id === product.id ? { ...current, stock: current.stock + 1 } : current,
            ),
          ),
      });
    }
  }
}
