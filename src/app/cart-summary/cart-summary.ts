import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject } from '@angular/core';
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

  protected readonly subtotal = computed(() =>
    this.cart.items().reduce((total, item) => total + item.producto.precio, 0),
  );

  ngOnInit(): void {
    this.cart.load();
  }

  protected removeItem(item: CartItem): void {
    this.cart.remove(item);
  }
}
