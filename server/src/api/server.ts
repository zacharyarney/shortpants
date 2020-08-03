import express from 'express';
import { Errback, Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hey there!', who: 'you!', wow: 'wowee!' });
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ SERVER_ERROR: err });
});

export default app;