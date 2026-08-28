import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CartItem as CartItemModel } from '../../domain/cart-item.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  selector: 'app-cart-item',
  templateUrl: './cart-item.html',
})
export class CartItem {
  readonly item = input.required<CartItemModel>();
  readonly remove = output<CartItemModel>();
}
