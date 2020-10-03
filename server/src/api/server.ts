import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { addUrl, getUrl } from './controllers/urlController';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '/static')));
app.use(helmet());
app.use(morgan('short'));
// app.use(cors());

// ROUTES
app.post('/new', addUrl);
app.get('/:hash', getUrl);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

export default app;
