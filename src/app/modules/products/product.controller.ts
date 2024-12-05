import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    const zodParsedData = productValidationSchema.parse(productData);
    // will call service function (with send this data)
    // after processing (sql/nosql) received response
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    // send response
    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products are retrieved succesfully',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Single product is retrieved succesfully',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    const result = await ProductServices.updateSingleProductDataFromDB(
      productId,
      updates,
    );

    res.status(200).json({
      success: true,
      message: 'Single product is updated succesfully',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product is deleted succesfully',
      data: result,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
