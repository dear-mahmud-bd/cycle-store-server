import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// route will call controller -> it will controll all application logic
// handle request and response

router.post('/create-product', ProductController.createProduct);

export const ProductRoutes = router;
