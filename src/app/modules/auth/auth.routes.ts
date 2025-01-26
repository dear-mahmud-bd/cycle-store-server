import express from 'express';
import { AuthControllers } from './auth.controller';

const router = express.Router();

router.post('/register', AuthControllers.register);

router.get('/login', AuthControllers.login);

export const AuthRoutes = router;
