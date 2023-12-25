import express from 'express';
const router = express.Router();
import * as BookController from '../controllers/bookController.js';
import { checkRole } from '../middleware/checkRole.js';
import { authenticate } from '../middleware/authentication.js';

router.get('/', BookController.getAllBooks);

router.post('/add',authenticate,  checkRole(['admin']), BookController.addBook);
router.post("/remove", authenticate,  checkRole(['admin']), BookController.removeBook);
router.post('/issue',authenticate,  checkRole(['admin']), BookController.issueBook);
router.post("/return", authenticate,  checkRole(['admin']), BookController.returnBook);
router.post("/changeAvailable", authenticate,  checkRole(['admin']), BookController.changeAvailability);
router.get("/bookshistory", authenticate,  checkRole(['user',"admin"]), BookController.booksHistory);

export default router;