import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import fetchData from "../../libs/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [revenues, setRevenues] = useState([]);

  const years = [2025, 2026]; // তোমার প্রয়োজন অনুযায়ী update করতে পারো

  const getRevenueData = async (selectedYear) => {
    try {
      const res = await fetchData(`/api/v1/dashboard/user/total-revenue-year-wise/${selectedYear}`, "GET");
      if (res.success) {
        // যদি API month-wise revenue না পাঠায়, fill missing months with 0
        const monthData = Array(12).fill(0);
        res.data.forEach((row) => {
          if (row.month >= 1 && row.month <= 12) {
            monthData[row.month - 1] = row.revenue || 0;
          }
        });
        setRevenues(monthData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRevenueData(year);
  }, [year]);

  const labels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const data = {
  labels,
  datasets: [
    {
      label: `Monthly Profit - ${year}`,
      data: revenues,
      backgroundColor: "rgba(53, 199, 235, 0.5)",
      borderColor: "rgba(53, 199, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" },
    title: { display: true, text: `Monthly Profit for ${year}` },
    datalabels: {
      color: "#1e40af", // Dark blue color for amount
      font: { weight: "bold", size: 14 }, // Bold & larger font
      anchor: "end", // Show above bar
      align: "end",
      formatter: (value) => `৳ ${value}`, // Show currency sign
    },
  },
  scales: {
    y: { beginAtZero: true },
  },
};


  return (
    <div style={{ width: "100%" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="yearSelect" style={{ marginRight: "10px", fontWeight: "bold" }}>Select Year:</label>
        <select
          id="yearSelect"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ padding: "5px 10px", fontSize: "16px" }}
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default RevenueChart;
