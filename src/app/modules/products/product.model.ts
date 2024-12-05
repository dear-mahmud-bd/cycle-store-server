import { Schema, model } from 'mongoose';
import { TProduct, BicycleType, ProductModel } from './product.interface';

const productSchema = new Schema<TProduct, ProductModel>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      unique: true,
    },
    brand: {
      type: String,
      required: [true, 'Brand is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [10, 'Price must be geter than 10'],
    },
    type: {
      type: String,
      enum: {
        values: Object.values(BicycleType),
        message: '{VALUE} is not a valid bicycle type',
      },
      required: [true, 'Bicycle type is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity must be a positive number'],
    },
    inStock: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Query Middleware (current querry)
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});
productSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } }).select('-isDeleted');
  next();
});

// Aggregation middeware (pipeline)
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift(
    { $match: { isDeleted: { $ne: true } } },
    { $unset: 'isDeleted' },
  );
  next();
});

//create a custom static method
productSchema.statics.isNameExists = async function (name: string) {
  return await this.findOne({ name });
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
