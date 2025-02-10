import express from 'express';
import { AuthControllers } from './auth.controller';
import { AuthGuard } from '../../middlewares/authGuard';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post('/register', AuthControllers.register);

router.post('/login', AuthControllers.login);

router.get('/users', AuthGuard(USER_ROLE.admin), AuthControllers.getAllUsers);

export const AuthRoutes = router;
