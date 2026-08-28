import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { CartItem } from '../shared/domain/cart-item.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-cart-summary',
  styleUrl: './cart-summary.css',
  templateUrl: './cart-summary.html',
})
export class CartSummary implements OnInit {
  protected readonly cart = inject(CartService);
  protected readonly isPurchasing = signal(false);
  protected readonly purchaseCompleted = signal(false);

  protected readonly subtotal = computed(() =>
    this.cart.items().reduce((total, item) => total + item.producto.precio, 0),
  );

  protected readonly shipping = computed(() => {
    const amount = this.subtotal();
    return amount > 100 ? 0 : amount >= 50 ? 5 : 10;
  });

  protected readonly total = computed(() => this.subtotal() + this.shipping());

  ngOnInit(): void {
    this.cart.load();
  }

  protected removeItem(item: CartItem): void {
    this.cart.remove(item);
  }

  protected finishPurchase(): void {
    if (this.cart.items().length === 0 || this.isPurchasing()) {
      return;
    }

    this.isPurchasing.set(true);
    this.cart.hasError.set(false);
    this.cart.checkout({
      fecha: new Date().toISOString(),
      productos: this.cart.items().map(({ producto }) => producto),
      subtotal: this.subtotal(),
      gastos_transporte: this.shipping(),
      total: this.total(),
    }).subscribe({
      next: () => this.cart.clear().subscribe({
        next: () => {
          this.isPurchasing.set(false);
          this.purchaseCompleted.set(true);
        },
        error: () => {
          this.isPurchasing.set(false);
          this.cart.hasError.set(true);
        },
      }),
      error: () => {
        this.isPurchasing.set(false);
        this.cart.hasError.set(true);
      },
    });
  }
}
