import express from 'express';
const router = express.Router();
import { addExpense, updateExpense, deleteExpense, getExpenses, getSpendingInsights } from '../controllers/expenseContoller.ts';
import authenticateUser from '../middleware/authMiddleware.ts';

router.post('/add', authenticateUser, addExpense);
router.put('/update/:id', authenticateUser, updateExpense);
router.delete('/delete/:id', authenticateUser, deleteExpense);
router.get('/list', authenticateUser, getExpenses);
router.get('/insights', authenticateUser, getSpendingInsights);

export default router;
