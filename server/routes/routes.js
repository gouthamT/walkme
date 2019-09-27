import express from 'express';
import View from './View';
import { getWalkMes, getWalkMeByFileName } from './getWalkMe';
import publicFiles from './public';

const router = express.Router();

router.get('/', View);

router.get('/api/walkme', getWalkMes);

router.post('/api/walkme', getWalkMeByFileName);

router.get('/public/*', publicFiles);

export default router;