import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AddExpense from "../Modals/AddExpense";
import InsightsModal from "../Modals/InsightsModal";
import UpdateExpense from "../Modals/UpdateExpense";
import axios from "axios";
import { fetchExpenses } from "../../../api";

function ExpenseManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState<any>(null);  
    const [expenses, setExpenses] = useState<any[]>([]);  
    const [totalExpenses, setTotalExpenses] = useState<number>(0);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenInsightsModal = () => {
        setIsInsightsModalOpen(true);
    };

    const handleCloseInsightsModal = () => {
        setIsInsightsModalOpen(false);
    };

    const handleModifyExpense = (expense: any) => {
        setSelectedExpense(expense);
        setIsUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    useEffect(() => {
        const fetchExpensesData = async () => {
            try {
                const { expenses, totalExpenses } = await fetchExpenses();
                console.log(expenses);
                setExpenses(expenses);
                setTotalExpenses(totalExpenses);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        };

        fetchExpensesData();
    }, [searchQuery]);

    return (
        <div className="bg-secondary min-h-screen px-8 py-6">
            <ToastContainer />
            <div className="flex justify-center items-center mb-10" data-aos="fade-up" data-aos-delay="50">
                <div className="relative w-full max-w-[600px]">
                    <img

                        alt="Search Icon"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6"
                    />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search events, e.g., 'Team Meeting, New Delhi, 31/01/2025'"
                        className="w-full h-[48px] rounded-full border border-black px-12 text-gray-600 text-sm outline-none focus:ring-2 focus:ring-primary bg-secondary"
                    />
                </div>
            </div>

            <div className="flex justify-between items-start mb-10" data-aos="fade-up" data-aos-delay="50">
                <div>
                    <h2 className="text-[28px] font-bold text-black mb-4">

                    </h2>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleOpenModal}

                            className={`px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-black border-black bg-yellow/75 hover:bg-primary hover:text-white`}
                        >
                            Add Expense
                        </button>
                        <button
                            onClick={handleOpenInsightsModal}

                            className={`px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-black border-black bg-yellow/75 hover:bg-primary hover:text-white`}
                        >
                            View Expense Insight
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-primary rounded-lg" data-aos="fade-up" data-aos-delay="50">
                    <thead className="bg-primary text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-bold">S.No.</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Amount</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Category</th>
                            <th className="px-6 py-3 text-left text-sm font-bold">Date</th>
                            <th className="px-6 py-3 text-left text-sm font-bold"></th>
                            <th className="px-6 py-3 text-left text-sm font-bold"></th>

                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr
                                key={expense._id}
                                className={`border-b border-primary
                                            }`}
                            >
                                <td className="px-6 py-4 text-sm">{index + 1}</td>
                                <td className="px-6 py-4 text-sm text-black break-words max-w-xs">{expense.amount}</td>
                                <td className="px-6 py-4 text-sm text-black break-words max-w-xs">
                                    {expense.category}
                                </td>
                                <td className="px-6 py-4 text-sm text-black break-words max-w-xs">
                                    {expense.date}
                                </td>
                                <td>
                                    <button className="px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-black border-black hover:bg-primary hover:text-white hover:border-primary">
                                        View Expense
                                    </button>
                                </td>
                                <td>

                                    <button onClick={handleModifyExpense} className="mr-4 px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-black border-black hover:bg-primary hover:text-white hover:border-primary">

                                        Modify
                                    </button>


                                    <button className="mr-4 px-4 py-2 rounded-full font-medium text-sm border bg-transparent text-[#FF0000] border-[#FF0000] hover:bg-[#FF0000] hover:text-black hover:border-primary">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && <AddExpense onClose={handleCloseModal} />}
            {isUpdateModalOpen && <UpdateExpense onClose={handleCloseUpdateModal} expense={selectedExpense} onUpdate={() => { }} />}
            {isInsightsModalOpen && <InsightsModal onClose={handleCloseInsightsModal} />}

        </div>
    );
}

export default ExpenseManagement;