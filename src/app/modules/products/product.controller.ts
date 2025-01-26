import { Request, Response } from 'express';
import { ProductServices } from './product.service';
import productValidationSchema from './product.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const zodParsedData = productValidationSchema.parse(productData);
  // will call service function (with send this data)
  // after processing (sql/nosql) received response
  const result = await ProductServices.createProductIntoDB(zodParsedData);
  sendResponse(res, {
    success: true,
    message: 'Bicycle created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const search = req.query;
  const result = await ProductServices.getAllProductsFromDB(search);
  sendResponse(res, {
    success: true,
    message: 'Bicycles retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    success: true,
    message: 'Bicycle is retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const updates = req.body;
  const result = await ProductServices.updateSingleProductDataFromDB(
    productId,
    updates,
  );
  sendResponse(res, {
    success: true,
    message: 'Bicycle is updated succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductServices.deleteProductFromDB(productId);
  sendResponse(res, {
    success: true,
    message: 'Bicycle deleted succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
