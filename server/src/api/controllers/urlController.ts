import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import * as urls from '../models/url';

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface RequestBody {
  url: string;
}

interface UrlRequest<T> extends Request {
  body: T;
}

export const addUrl: Controller = async (
  req: UrlRequest<RequestBody>,
  res,
  next
) => {
  let { url } = req.body;

  // check for and strip away 'https://' or 'http://'
  if (url.slice(0, 8) === 'https://') {
    console.log('HTTPS');
    url = url.slice(8);
  } else if (url.slice(0, 7) === 'http://') {
    console.log('HTTP');
    url = url.slice(7);
  }
  console.log('URL: ', url.slice(0, 8));

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
        await urls.addUrl(args);
      } catch (e) {
        next(e);
      }
    }

    res.redirect(`/submitted/${hash}`);
  } catch (e) {
    next(e);
  }
};

export const getUrl: Controller = async (req, res, next) => {
  const { hash } = req.params;

  try {
    const data = await urls.getUrl(hash);

    if (!data) {
      res.status(404).json({ NOT_FOUND: 'URL not found.' });
    } else {
      res.status(302).redirect(`https://${data.url}`);
    }
  } catch (e) {
    next(e);
  }
};
