import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CartSummary } from './cart-summary/cart-summary';
import { PurchaseHistory } from './purchase-history/purchase-history';

export const routes: Routes = [
  { path: '', component: ProductList, data: { title: 'Catálogo' } },
  { path: 'carrito', component: CartSummary, data: { title: 'Carrito' } },
  { path: 'compras', component: PurchaseHistory, data: { title: 'Últimas compras' } },
];
