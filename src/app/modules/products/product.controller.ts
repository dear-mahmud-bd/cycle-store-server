import { ProductServices } from './product.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createProduct = catchAsync(async (req, res) => {
  const productData = req.body;
  // will call service function (with send this data)
  // after processing (sql/nosql) received response
  const result = await ProductServices.createProductIntoDB(productData);
  sendResponse(res, {
    success: true,
    message: 'Bicycle created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const search = req.query;
  const result = await ProductServices.getAllProductsFromDB(search);
  sendResponse(res, {
    success: true,
    message: 'Bicycles retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await ProductServices.getSingleProductFromDB(productId);
  sendResponse(res, {
    success: true,
    message: 'Bicycle is retrieved succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const updateSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updatedData = req.body;
  // eslint-disable-next-line no-console
  console.log(productId, updatedData);
  const result = await ProductServices.updateSingleProductDataFromDB(
    productId,
    updatedData,
  );
  sendResponse(res, {
    success: true,
    message: 'Bicycle is updated succesfully',
    statusCode: httpStatus.OK,
    data: result,
  });
});

const deleteSingleProduct = catchAsync(async (req, res) => {
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
