import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { CartSummary } from './cart-summary/cart-summary';

export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'carrito', component: CartSummary },
];
