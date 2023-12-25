import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/userController.js';
import { checkRole } from '../middleware/checkRole.js';
import { authenticate } from '../middleware/authentication.js';

router.get('/', authenticate,  checkRole(['admin']), UserController.getAllUsers);

router.post('/login', UserController.loginUser);
router.post('/register', UserController.addUser);

router.post('/transaction', UserController.showTransactions);

export default router;