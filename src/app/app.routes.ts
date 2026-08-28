import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CartSummary } from './cart-summary/cart-summary';
import { PurchaseHistory } from './purchase-history/purchase-history';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'carrito', component: CartSummary },
  { path: 'compras', component: PurchaseHistory },
];
