import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function InsightsModal({ onClose }: { onClose: () => void }) {
  const [insightsData, setInsightsData] = useState<any>(null);

  useEffect(() => {
    // Fetch data for spending insights
    const fetchInsights = async () => {
      try {
        const response = await fetch("/api/expenses/insights"); // Your API endpoint to fetch insights
        const data = await response.json();
        setInsightsData(data);
      } catch (error) {
        console.error("Error fetching insights:", error);
      }
    };

    fetchInsights();
  }, []);

  const chartData = {
    labels: insightsData?.categoryPercentages.map((item: any) => item.category) || [],
    datasets: [
      {
        label: "Amount Spent",
        data: insightsData?.categoryPercentages.map((item: any) => item.totalSpent) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full relative border border-gray-300">
          <h2 className="text-xl font-bold mb-4">Expense Insights</h2>
          {insightsData ? (
            <div>
              <Bar data={chartData} options={{ responsive: true, plugins: { title: { display: true, text: "Category-wise Spending" } } }} />
            </div>
          ) : (
            <p>Loading insights...</p>
          )}
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightsModal;
