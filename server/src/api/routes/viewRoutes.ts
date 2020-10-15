import express from 'express';
import path from 'path';
import submittedView from '../views/submittedView';

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'src/api/static/submitUrl.html'));
});

router.get('/view/:hash', (req, res) => {
  const view = submittedView(req.params.hash);
  console.log(view);
  res.set('Content-Type', 'text/html').status(200).send(view);
});

router.get('/:hash', (req, res) => {
  const { hash } = req.params;
  res.redirect(`/api/${hash}`)
})

export default router;
