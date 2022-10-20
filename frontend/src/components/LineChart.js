import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const decimation = {
  enabled: false,
  algorithm: "lttb",
};

const options = {
  backgroundColor: [
    "rgba(75,192,192,1)",
    "#ecf0f1",
    "#50AF95",
    "#f3ba2f",
    "#2a71d0",
  ],
  borderColor: "black",
  borderWidth: 2,
  tension: 0.2,
  normalized: true,
  plugins: {
    //dont work for now
    decimation: decimation,
  },
  scales: {
    x: {
      type: "time",
    },
  },
};

function LineChart({ chartData }) {
  return <Line data={chartData} options={options} />;
}

export default LineChart;
