export interface Product {
  /** Available count */
  count: number;
  description: string;
  id: string;
  price: number;
  title: string;
}

export interface ProductCheckout extends Product {
  orderedCount: number;
  /** orderedCount * price */
  totalPrice: number;
}

export interface ProductsResponse {
  products: Product[];
}

export interface ProductResponse {
  product: Product;
}
