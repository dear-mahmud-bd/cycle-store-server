import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/register', AuthControllers.register);
router.post('/login', AuthControllers.login);
router.get('/users', AuthGuard(USER_ROLE.admin), AuthControllers.getAllUsers);

router.get(
  '/:email',
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  AuthControllers.getUserByEmail,
);
router.patch(
  '/:email/update-name',
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  AuthControllers.updateUserName,
);
router.patch(
  '/change-password',
  AuthGuard(USER_ROLE.admin, USER_ROLE.customer),
  AuthControllers.changePassword,
);
router.patch(
  '/update-role',
  AuthGuard(USER_ROLE.admin),
  AuthControllers.updateUserRole,
);
router.patch(
  '/update-block-status',
  AuthGuard(USER_ROLE.admin),
  AuthControllers.updateUserBlockStatus,
);

export const AuthRoutes = router;
