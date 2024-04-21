"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import { Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

function Chart({ userBookings }: { userBookings: Booking[] }) {
  const labels = userBookings.map((booking) => booking.kamarHotel.nama);
  const amountSpent = userBookings.map((booking) => booking.hargaTotal);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount spent",
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: "#F27405",
            hoverBackgroundColor: "#F2C641",
          },
        ],
      }}
    />
  );
}

export default Chart;
