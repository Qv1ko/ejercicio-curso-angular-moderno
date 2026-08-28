import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../domain/product.type';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  selector: 'app-product-card',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly add = output<Product>();
}
