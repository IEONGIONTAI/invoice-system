import React from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  // 條形圖數據
  const barData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "收據數量",
        data: [12, 19, 10, 15, 22, 30],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // 圓餅圖數據
  const pieData = {
    labels: ["食品", "服裝", "電子產品", "其他"],
    datasets: [
      {
        label: "收據金額",
        data: [5000, 10000, 15000, 2000],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
      },
    ],
  };

  // 折線圖數據
  const lineData = {
    labels: ["1月", "2月", "3月", "4月", "5月", "6月"],
    datasets: [
      {
        label: "收據金額",
        data: [5000, 7000, 8000, 12000, 15000, 20000],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">公司統計</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {/* 條形圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">收據數量統計（按月）</h2>
          <Bar data={barData} />
        </div>

        {/* 新增折線圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">年度收入趨勢</h2>
          <Line
            data={{
              labels: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              datasets: [
                {
                  label: "收入",
                  data: [
                    3000, 5000, 4000, 6000, 8000, 7000, 9000, 11000, 13000,
                    15000, 17000, 20000,
                  ],
                  borderColor: "rgba(75, 192, 192, 1)",
                  backgroundColor: "rgba(75, 192, 192, 0.2)",
                  fill: true,
                },
              ],
            }}
          />
        </div>

        {/* 折線圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">收據金額趨勢</h2>
          <Line data={lineData} />
        </div>

        {/* 新增條形圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">季度收據數量</h2>
          <Bar
            data={{
              labels: ["Q1", "Q2", "Q3", "Q4"],
              datasets: [
                {
                  label: "收據數量",
                  data: [45, 67, 78, 56],
                  backgroundColor: "rgba(153, 102, 255, 0.5)",
                },
              ],
            }}
          />
        </div>

        {/* 新增圓餅圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">年度金額分類</h2>
          <Pie
            data={{
              labels: ["食品", "服裝", "電子產品", "家具"],
              datasets: [
                {
                  label: "金額",
                  data: [30000, 45000, 20000, 15000],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                  ],
                },
              ],
            }}
          />
        </div>
        {/* 圓餅圖 */}
        <div className="bg-white p-4 shadow rounded w-full sm:w-[48%] lg:w-[48%]">
          <h2 className="text-lg font-bold mb-4">收據金額分類</h2>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
