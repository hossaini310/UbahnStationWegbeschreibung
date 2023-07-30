import express from 'express';
import asyncHandler from 'express-async-handler';
import { getBeaconInfo } from '../controllers/beacons.controller.js';

const router = express.Router();

router.post('/beacons', asyncHandler(getBeaconInfo));

export default router;
