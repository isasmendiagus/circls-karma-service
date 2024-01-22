import express from 'express';
import config from '../../config';
import { get, post } from './events.controller';

const router = express.Router();
router.get(config.apiPrefix + '/events', get);
router.post(config.apiPrefix + '/events', post);

export default router;
