import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routers';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//parsers
app.use(express.json());
// app.use(cors({ origin: "*", credentials: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Allow all origins dynamically
    },
    credentials: true,
  }),
);

// application routes
app.use('/api', router);

const getAController = (req: Request, res: Response) => {
  res.send('Hello TypeScript :)');
};
app.get('/', getAController);
app.use(notFound);
app.use(globalErrorHandler);

export default app;
