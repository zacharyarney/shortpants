import path from 'path';
import fs from 'fs';
import https from 'https';
import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import urlRoutes from './routes/urlRoutes';
import viewRoutes from './routes/viewRoutes';

const app = express();

// MIDDLEWARE
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/static')));
app.use(helmet());
app.use(morgan('short'));
// app.use(cors());

// ROUTES
app.use('/', viewRoutes);
app.use('/api', urlRoutes);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

export const httpsServer = https.createServer(
  {
    key: fs.readFileSync('localhost.key'),
    cert: fs.readFileSync('localhost.crt'),
    requestCert: false,
    rejectUnauthorized: false,
  },
  app
);
