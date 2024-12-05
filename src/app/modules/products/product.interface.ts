import { Model } from 'mongoose';

export enum BicycleType {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  type: BicycleType;
  description: string;
  quantity: number;
  inStock: boolean;
  isDeleted: boolean;
};

export interface ProductModel extends Model<TProduct> {
  isNameExists(name: string): Promise<TProduct | null>;
}
