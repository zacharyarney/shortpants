import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';
import * as urls from '../models/url';

type controller = (req: Request, res: Response, next: NextFunction) => void;

export const addUrl: controller = (req, res, next) => {
  const { url } = req.body;
  urls
    .addUrl(req.body)
    .then(urlRes => {
      res.status(200).json({ success: true, url: urlRes });
    })
    .catch(e => {
      next(e);
    });
};
