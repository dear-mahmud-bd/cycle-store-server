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
router.get('/', AuthGuard(USER_ROLE.admin), OrderController.getAllOrders);
router.get(
  '/:email',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  OrderController.getUserOrders,
);
router.patch(
  '/:orderId/status',
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  OrderController.updateOrderStatus,
);
router.get(
  '/revenue',
  AuthGuard(USER_ROLE.admin),
  OrderController.calculateRevenue,
);

export const OrderRoutes = router;
