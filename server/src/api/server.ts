import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { addUrl, retrieveUrl } from './controllers/urlController';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hey there!', who: 'you!', wow: 'wowee!' });
});

// ROUTES
app.post('/new', addUrl);
app.get('/:hash', retrieveUrl);

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

export default app;
