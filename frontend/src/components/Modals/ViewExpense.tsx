function ViewExpense({ onClose, expense }: { onClose: () => void, expense: any }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Expense Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Expense Name</label>
            <p className="text-sm">{expense.expenseName}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Amount</label>
            <p className="text-sm">Rs. {expense.amount}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-font-semibold mb-1">Category</label>
            <p className="text-sm">{expense.category}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Date</label>
            <p className="text-sm">{formatDate(expense.date)}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <p className="text-sm">{expense.description}</p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>

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

export default ViewExpense;
