import { Request, Response } from 'express';
import { StudentServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    // will call service function (with send this data)
    // after processing (sql/nosql) received response
    const result = await StudentServices.createProductIntoDB(productData);
    // send response
    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const ProductController = {
  createProduct,
};
