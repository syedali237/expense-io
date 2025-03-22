import React, { useState, useRef } from 'react';
import { addExpense } from '../../../api';

function AddExpense({ onClose, onAdd }: { onClose: () => void; onAdd : (newExpense :any) => void } ) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseName, setExpenseName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isOtherCategory, setIsOtherCategory] = useState(false);
  const form = useRef<HTMLFormElement | null>(null);

  const handleAddExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const expenseData = {
          expenseName,
          amount,
          category: isOtherCategory ? 'Other: ' + category : category,
          date,
          description,
        };
        const response = await addExpense(expenseData);
        console.log(response); 
        onAdd(response);  // Call onAdd to update the expenses list
        onClose();  
      } catch (error) {
        console.error('Error adding expense:', error);
      }
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Add Expense</h2>

          <form ref={form} onSubmit={handleAddExpenseSubmit}>
            <div className="mb-4">
              <label htmlFor="expenseName" className="block text-sm font-medium mb-1">
                Expense Name
              </label>
              <input
                type="text"
                id="expenseName"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Expense Name"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium mb-1">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium mb-1">
                Category
              </label>
              <select
                id="category"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'Other') {
                    setIsOtherCategory(true);
                  } else {
                    setIsOtherCategory(false);
                  }
                }}
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Rent">Rent</option>
                <option value="Miscellaneous">Miscellaneous</option>
                <option value="Other">Other</option>
              </select>
              {isOtherCategory && (
                <input
                  type="text"
                  className="w-full mt-2 border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter custom category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary hover:text-primary"
              >
                Add Expense
              </button>
            </div>
          </form>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
