import express from 'express';
import { addUrl, getUrl } from '../controllers/urlController';

const router = express.Router();

router.post('/new', addUrl);
router.get('/:hash', getUrl);

export default router;
