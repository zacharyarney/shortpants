import path from 'path';
import { Controller } from './urlController';
import submittedView from '../views/submittedView';

export const home: Controller = (req, res, next) => {
  res.sendFile(path.resolve(process.cwd(), 'src/api/static/submitUrl.html'));
};

export const submitted: Controller = (req, res, next) => {
  const view = submittedView(req.params.hash);
  res.set('Content-Type', 'text/html').status(200).send(view);
};
