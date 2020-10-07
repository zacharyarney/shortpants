import crypto from 'crypto';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import { ObjectID } from 'mongodb';
import * as urls from '../models/url';
import submittedView from '../views/submittedView';

type controller = (req: Request, res: Response, next: NextFunction) => void;

export const addUrl: controller = async (req, res, next) => {
  const { url } = req.body;
  const fullHash = crypto.createHash('sha1').update(url).digest('base64');
  // replaces url-breaking characters '+', '/', '=', '$'
  const urlSafe = fullHash
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  // truncate hash into 6 character string
  const hash = urlSafe.substring(0, 6);
  const args = { hash, url };

  try {
    const url = await urls.getUrl(hash);
    if (!url) {
      try {
        // const urlRes = await urls.addUrl(args);
        // res.status(200).json(urlRes);
        await urls.addUrl(args);
      } catch (e) {
        next(e);
      }
    }

    res.status(200).redirect(`/view/${hash}`);
  } catch (e) {
    next(e);
  }
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
