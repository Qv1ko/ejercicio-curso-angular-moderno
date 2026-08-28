import { NULL_PRODUCT, Product } from './product.type';

export type CartItem = {
  id: string;
  producto: Product;
};

export const NULL_CART_ITEM: CartItem = {
  id: '',
  producto: NULL_PRODUCT,
};
