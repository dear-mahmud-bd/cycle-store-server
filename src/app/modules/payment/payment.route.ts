import express from 'express';
import { PaymentController } from './payment.controlle';
import { USER_ROLE } from '../user/user.constant';
import { AuthGuard } from '../../middlewares/authGuard';

const router = express.Router();

router.post(
  '/initiate',
  AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  PaymentController.initiatePayment,
);

router.post(
  '/success/:tranId/:orderId',
  // AuthGuard(USER_ROLE.customer, USER_ROLE.admin),
  PaymentController.verifyPayment,
);
router.post('/fail', PaymentController.paymentFail);

export const PaymentRoutes = router;
