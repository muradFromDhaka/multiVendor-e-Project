export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}


export interface OrderItem {
  productId: number;
  productName: string;
  vendorId: number;
  vendorName: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderResponse {
  orderId: number;
  userName: string;
  orderItems: OrderItem[];
  totalPrice: number;
  orderStatus: OrderStatus;
}