import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../utils/validateRequest';
import { ProductValidationSchema } from './product.validation';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.post(
  '/',
  AuthGuard(USER_ROLE.admin),
  validateRequest(ProductValidationSchema.createProductValidationSchema),
  ProductController.createProduct,
);
router.patch(
  '/:productId',
  AuthGuard(USER_ROLE.admin),
  ProductController.updateSingleProduct,
);
router.delete(
  '/:productId',
  AuthGuard(USER_ROLE.admin),
  ProductController.deleteSingleProduct,
);

export const ProductRoutes = router;
