import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

// route will call controller -> it will controll all application logic
// handle request and response

router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProduct);
router.post('/create-product', ProductController.createProduct);
router.put('/:productId', ProductController.updateSingleProduct);
router.delete('/:productId', ProductController.deleteSingleProduct);

export const ProductRoutes = router;
