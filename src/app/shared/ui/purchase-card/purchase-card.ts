import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Order } from '../../domain/order.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe],
  selector: 'app-purchase-card',
  templateUrl: './purchase-card.html',
})
export class PurchaseCard {
  readonly purchase = input.required<Order>();
}
