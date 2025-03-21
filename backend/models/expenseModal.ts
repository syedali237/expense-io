import mongoose, { Schema, Document } from 'mongoose';

interface Expense extends Document {
    expenseName: string;
    amount: number;
    category: string;
    date: Date;
    description?: string;
    user: mongoose.Schema.Types.ObjectId;
}

const expenseSchema = new Schema<Expense>({
    expenseName: { type: String },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const ExpenseModel = mongoose.model<Expense>('Expense', expenseSchema);

export default ExpenseModel;
