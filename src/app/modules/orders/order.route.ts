import express from 'express';
import { OrderController } from './order.controller';
import validateRequest from '../../utils/validateRequest';
import { OrderValidationSchema } from './order.validation';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  validateRequest(OrderValidationSchema.createOrderValidationSchema),
  OrderController.createOrder,
);
router.get(
  '/revenue',
  AuthGuard(USER_ROLE.admin),
  OrderController.calculateRevenue,
);

export const OrderRoutes = router;
