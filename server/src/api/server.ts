import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import urlRoutes from './routes/urlRoutes';
import viewRoutes from './routes/viewRoutes';

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '/static')));
app.use(helmet());
app.use(morgan('short'));
// app.use(cors());

// ROUTES
app.use('/', viewRoutes)
app.use('/api', urlRoutes);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

export default app;
