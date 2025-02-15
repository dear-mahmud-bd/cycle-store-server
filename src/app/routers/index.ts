import { Router } from 'express';
import { ProductRoutes } from '../modules/products/product.route';
import { OrderRoutes } from '../modules/orders/order.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { PaymentRoutes } from '../modules/payment/payment.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
