export type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  categoria_id: number;
  precio: number;
  stock: number;
};

export const NULL_PRODUCT: Product = {
  id: '',
  nombre: '',
  descripcion: '',
  categoria_id: 0,
  precio: 0,
  stock: 0,
};
