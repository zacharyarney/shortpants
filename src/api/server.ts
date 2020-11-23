// import fs from 'fs';
// import https from 'https';
import path from 'path';
import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { addUrl, getUrl } from './controllers/urlController';
import { home, submitted } from './controllers/viewController';

export const app = express();

// MIDDLEWARE
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), '/static')));
app.use(helmet());
app.use(morgan('short'));
// app.use(cors());

// ENDPOINTS
app.post('/api/new', addUrl);
app.get('/', home);
app.get('/submitted/:hash', submitted);
app.get('/:hash', getUrl);

// ERROR HANDLER
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

// export { app }

// export const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync('localhost.key'),
//     cert: fs.readFileSync('localhost.crt'),
//     requestCert: false,
//     rejectUnauthorized: false,
//   },
//   app
// );
