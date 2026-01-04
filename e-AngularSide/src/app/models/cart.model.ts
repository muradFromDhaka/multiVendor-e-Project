export interface CartDto {
  cartId?: number;
  items: ItemDto[];
  totalAmount: number;
}

export interface ItemDto {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface CartItemRequest {
  productId: number;
  quantity: number;
}
export interface ItemDto {
  itemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  total: number;  // quantity * price
  imageUrl?: string;
}