import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Order } from '../shared/domain/order.type';
import { ApiService } from '../shared/services/api.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  selector: 'app-purchase-history',
  styleUrl: './purchase-history.css',
  templateUrl: './purchase-history.html',
})
export class PurchaseHistory implements OnInit {
  private readonly api = inject(ApiService);

  protected readonly purchases = signal<Order[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly hasError = signal(false);

  ngOnInit(): void {
    this.api.getPurchases().subscribe({
      next: (purchases) => {
        this.purchases.set(
          purchases.reduce<Order[]>((sorted, purchase) => {
            const purchaseTime = new Date(purchase.fecha).getTime();
            const position = sorted.findIndex(
              (existing) => new Date(existing.fecha).getTime() < purchaseTime,
            );
            if (position === -1) {
              sorted.push(purchase);
            } else {
              sorted.splice(position, 0, purchase);
            }
            return sorted;
          }, []),
        );
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
