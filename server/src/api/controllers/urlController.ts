import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import * as urls from '../models/url';

export type controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export const addUrl: controller = async (req, res, next) => {
  // TODO: check for and strip away 'https://' or 'http://'
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

export const getUrl: controller = async (req, res, next) => {
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
