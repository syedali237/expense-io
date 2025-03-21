import { Request, Response } from 'express';
import ExpenseModel from '../models/expenseModal.ts';
import mongoose from 'mongoose';

// Add an expense
const addExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { expenseName, amount, category, date, description } = req.body;
    const userId = req.userId; // Now we can access userId from the request

    const newExpense = new ExpenseModel({
      expenseName,
      amount,
      category,
      date,
      description,
      user: userId, // Link the expense to the logged-in user
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).send('Error adding expense');
  }
};

// Update an expense
const updateExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { expenseName, amount, category, date, description } = req.body;

    const updatedExpense = await ExpenseModel.findOneAndUpdate(
      { _id: id, user: req.userId }, // Ensure only the logged-in user can update their own expenses
      { expenseName, amount, category, date, description },
      { new: true }
    );

    if (!updatedExpense) {
      res.status(404).send('Expense not found');
      return
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).send('Error updating expense');
  }
};

// Delete an expense
const deleteExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedExpense = await ExpenseModel.findOneAndDelete({ _id: id, user: req.userId });

    if (!deletedExpense) {
      res.status(404).send('Expense not found');
      return
    }

    res.status(200).send('Expense deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting expense');
  }
};

// Get expenses with pagination and filters (date range, category)
// const getExpenses = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { category, startDate, endDate, page = 1, limit = 10 } = req.query;
//     const userId = req.userId; // Use userId from the middleware

//     // Build the filter
//     let filter: any = { user: userId };
//     if (category) filter.category = category;
//     if (startDate && endDate) {
//       filter.date = { $gte: new Date(startDate as string), $lte: new Date(endDate as string) };
//     }

//     const expenses = await ExpenseModel.find(filter)
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit))
//       .sort({ date: -1 });

//     const totalExpenses = await ExpenseModel.countDocuments(filter);

//     res.status(200).json({ expenses, totalExpenses });
//   } catch (error) {
//     res.status(500).send('Error fetching expenses');
//   }
// };
const getExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId; // Use userId from the middleware

    // Build the filter to get all expenses for the logged-in user
    let filter: any = { user: userId };

    const expenses = await ExpenseModel.find(filter).sort({ date: -1 });

    const totalExpenses = await ExpenseModel.countDocuments(filter);

    res.status(200).json({ expenses, totalExpenses });
  } catch (error) {
    res.status(500).send('Error fetching expenses');
  }
};


// Spending insights (total per category, percentage distribution)
const getSpendingInsights = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const insights = await ExpenseModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      { $group: { _id: '$category', totalSpent: { $sum: '$amount' } } },
      { $sort: { totalSpent: -1 } },
    ]);

    // Calculate the total spending for percentage distribution
    const totalSpent = insights.reduce((sum: number, item: any) => sum + item.totalSpent, 0);

    const categoryPercentages = insights.map((item: any) => ({
      category: item._id,
      totalSpent: item.totalSpent,
      percentage: (item.totalSpent / totalSpent) * 100,
    }));

    res.status(200).json({ categoryPercentages, totalSpent });
  } catch (error) {
    res.status(500).send('Error calculating spending insights');
  }
};

export { addExpense, updateExpense, deleteExpense, getExpenses, getSpendingInsights };
