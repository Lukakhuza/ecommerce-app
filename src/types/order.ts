export enum OrderStatus {
  Pending = 'pending',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Returned = 'returned',
  Cancelled = 'cancelled',
}

interface Product {
  id: number;
  title: string;
  price: number;
}

interface OrderItem {
  _id: string;
  product: Product;
  quantity: number;
}

interface ShippingAddress {
  addressLine1: string;
  city: string;
  state: string;
  zipcode: string;
}

interface OrderPaymentMethodCard {
  brand: string;
  last4: string;
}

interface OrderPaymentMethod {
  id: string;
  card: OrderPaymentMethodCard;
}

export interface OrderData {
  _id: string;
  userId: string;
  items: OrderItem[];
  subTotal: number;
  taxAmount: number;
  shippingCost: number;
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: OrderPaymentMethod;
  createdAt: string; // ISO date string — convert to Date on the client if needed
  __v: number;
}
