import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/products/product.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/products', ProductRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Hello TypeScript!!!!!');
};
app.get('/', getAController);

export default app;
