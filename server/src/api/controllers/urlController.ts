import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';
import * as urls from '../models/url';

type controller = (req: Request, res: Response, next: NextFunction) => void;

export const addUrl: controller = (req, res, next) => {
  const { url } = req.body;
  const hash = crypto.createHash('sha1').update(url).digest('base64');
  // replaces url-breaking characters '+', '/', '=', '$'
  const urlSafe = hash
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  // truncates hash into 6 character string
  const truncHash = urlSafe.substring(0, 6);
  const args = { truncHash, url };
  urls
    .addUrl(args)
    .then(urlRes => {
      res.status(200).json(urlRes);
    })
    .catch(e => {
      next(e);
    });
};

export const getUrl: controller = (req, res, next) => {
  const { hash } = req.params;
  urls
    .getUrl(hash)
    .then(url => {
      if (!url) {
        res.status(404).json({ NOT_FOUND: 'URL not found.' });
      } else {
        res.status(200).json(url);
      }
    })
    .catch(e => {
      next(e);
    });
};
