import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  Bar,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from "react-chartjs-2";

// const decimation = {
//   enabled: false,
//   algorithm: "lttb",
// };

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
  // plugins: {
  //   //dont work for now
  //   decimation: decimation,
  // },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function LineChart(props) {
  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getDatasetAtEvent(chartRef.current, event));
  };

  return (
    <Line
      data={props.chartData}
      options={options}
      ref={chartRef}
      onClick={onClick}
    />
  );
}

export default LineChart;

// я думаю нужно переформатировать под time cartesian для того, чтобы информация по Х-оси была в дате, а не в значении

//для этого нужно date переделать под формат [{x:...,y:...}]
