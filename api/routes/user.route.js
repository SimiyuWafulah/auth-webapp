import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verify } from '../utils/verify.js';

const router = express.Router();

router.get('/test', test);
router.post('/update-user/:id', verify, updateUser)

export default router;