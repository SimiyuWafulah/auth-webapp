import express from 'express'
import { google, signin, signup } from '../controllers/auth.controller.js';
import { verify } from '../middlewares/verify.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);

router.get('/profile', verify, (req, res) => {
    res.json({message: 'You are Authenticated'})
})

export default router