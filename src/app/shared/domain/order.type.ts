import { Product } from './product.type';

export type Order = {
  fecha: Date;
  productos: Product[];
  subtotal: number;
  gastos_transporte: number;
  total: number;
  id: string;
};

export const NULL_ORDER: Order = {
  fecha: new Date(),
  productos: [],
  subtotal: 0,
  gastos_transporte: 0,
  total: 0,
  id: '',
};
