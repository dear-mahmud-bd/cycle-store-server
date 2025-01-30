export enum OrderStatusType {
  pending = 'pending',
  canceled = 'canceled',
  approved = 'approved',
  delivered = 'delivered',
}

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatusType;
};
