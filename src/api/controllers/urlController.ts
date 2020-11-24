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

  const fullHash = crypto.createHash('sha1').update(url).digest('base64');
  // replaces url-breaking characters '+', '/', '=', '$'
  const urlSafeHash = fullHash
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
  // truncate hash into 6 character string
  const hash = urlSafeHash.substring(0, 6);
  const args = { hash, url };

  try {
    const existingUrl = await urls.getUrl(hash);
    if (!existingUrl) {
      try {
        await urls.addUrl(args);
      } catch (e) {
        next(e);
      }
    } else if (existingUrl && existingUrl.url != url) {
      // TODO: this block is for catching collisions.
      // could create "buckets" in mongodb document with an array of urls associated with hash
      // append index of url in array to the hash
    }

    // res.status(200).json(existingUrl);
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
      res.status(302).redirect(`http://${data.url}`);
    }
  } catch (e) {
    next(e);
  }
};
