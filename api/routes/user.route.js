import express from 'express'
import { deleteUser, test, updateUser } from '../controllers/user.controller.js';
import { verify } from '../utils/verify.js';

const router = express.Router();

router.get('/test', test);
router.post('/update-user/:id', verify, updateUser);
router.delete('/delete-user/:id', verify, deleteUser);

export default router;
