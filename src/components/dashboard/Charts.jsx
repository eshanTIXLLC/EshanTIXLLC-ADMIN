import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import fetchData from "../../libs/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Charts() {
  const [orderCounts, setOrderCounts] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate last 5 years for dropdown
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = [];
    for (let i = 0; i < 5; i++) {
      yearList.push(currentYear - i);
    }
    setYears(yearList);
  }, []);

  // Fetch monthly order count for selected year
  const getOrderCounts = (year) => {
    fetchData(`/api/v1/orders/month-wise/${year}`, "GET")
      .then((res) => {
        if (res.success) {
          setOrderCounts(res.data);
        } else {
          setOrderCounts([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setOrderCounts([]);
      });
  };

  // Fetch on year change
  useEffect(() => {
    getOrderCounts(selectedYear);
  }, [selectedYear]);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: { size: 16 },
      },
    },
    title: {
      display: true,
      text: `Monthly Orders - ${selectedYear}`,
      font: { size: 22, weight: "bold" },
    },
    tooltip: {
      bodyFont: { size: 14 },
      titleFont: { size: 16 },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 14 } },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Number of Orders", // Y-axis label
        font: { size: 16, weight: "bold" },
      },
      ticks: {
        stepSize: 1,
        font: { size: 14 },
      },
    },
  },
};

  const data = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: orderCounts?.map((itm) => itm.count),
        backgroundColor: "rgba(53, 199, 235, 0.5)",
        borderColor: "rgba(53, 199, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="mt-4" style={{ width: "100%" }}>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="yearSelect" style={{ marginRight: "10px" }}>
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%" }}>
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default Charts;
