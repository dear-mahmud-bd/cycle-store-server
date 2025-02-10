export enum OrderStatusType {
  pending = 'pending',
  approved = 'approved',
  delivered = 'delivered',
  cancelled = 'cancelled',
}

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatusType;
};
