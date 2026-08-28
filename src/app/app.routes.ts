import { Routes } from '@angular/router';
import { CartSummary } from './routes/cart-summary/cart-summary';
import { ProductList } from './routes/product-list/product-list';
import { PurchaseHistory } from './routes/purchase-history/purchase-history';

export const routes: Routes = [
  { path: '', component: ProductList, title: 'Catálogo' },
  { path: 'carrito', component: CartSummary, title: 'Carrito' },
  { path: 'compras', component: PurchaseHistory, title: 'Últimas compras' },
];
