import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { CartItem as CartItemModel } from '../../shared/domain/cart-item.type';
import { NotificationService } from '../../shared/services/notification.service';
import { Header } from '../../core/components/header/header';
import { CartItem } from '../../shared/ui/cart-item/cart-item';
import { StatusMessage } from '../../shared/ui/status-message/status-message';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, Header, CartItem, StatusMessage],
  selector: 'app-cart-summary',
  styleUrl: './cart-summary.css',
  templateUrl: './cart-summary.html',
})
export class CartSummary implements OnInit {
  protected readonly cart = inject(CartService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);
  protected readonly isPurchasing = signal(false);

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

  protected removeItem(item: CartItemModel): void {
    this.cart.remove(item).subscribe();
  }

  protected finishPurchase(): void {
    if (this.cart.items().length === 0 || this.isPurchasing()) {
      return;
    }

    this.isPurchasing.set(true);
    this.cart.hasError.set(false);
    this.cart
      .checkout({
        fecha: new Date().toISOString(),
        productos: this.cart.items().map(({ producto }) => producto),
        subtotal: this.subtotal(),
        gastos_transporte: this.shipping(),
        total: this.total(),
      })
      .subscribe({
        next: () => {
          this.isPurchasing.set(false);
          this.notification.show('Compra realizada correctamente.');
          void this.router.navigateByUrl('/');
        },
        error: () => {
          this.isPurchasing.set(false);
          this.cart.hasError.set(true);
        },
      });
  }
}
