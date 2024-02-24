import React, { useEffect, useState } from "react";
import { Select, MenuItem, useTheme } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PredictiveSpending = () => {
  const [data, setData] = useState({ savings: [], costs: [] });

  useEffect(() => {
    // Replace with the actual API call
    fetch("/api/predictive-data")
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns an object with 'savings' and 'costs' arrays
        setData({ savings: data.savings, costs: data.costs });
      });
  }, []);

  // select
  const [timePeriod, setTimePeriod] = React.useState("1");
  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTimePeriod(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const colors = [
    "#FFA07A", // Light Salmon
    "#FFD700", // Gold
    "#87CEEB", // Sky Blue
    "#32CD32", // Lime Green
    "#BA55D3", // Medium Orchid
    "#FF4500", // Orange Red
    "#20B2AA", // Light Sea Green
  ];

  // chart
  const optionscolumnchart: ApexCharts.ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 400, // Adjust height to fit the legend
      stacked: true,
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "right", // Adjust based on preference
      fontSize: "16px",
      markers: {
        width: 16,
        height: 16,
      },
    },
    grid: {
      borderColor: "rgba(0,0,0,0.1)",
      strokeDashArray: 3,
    },
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      categories: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },
    tooltip: {
      theme: "light",
    },
  };
  const seriescolumnchart = [
    {
      name: "Predicted Savings",
      data: data.savings, // data fetched from API
    },
    {
      name: "Predicted Costs",
      data: data.costs, // data fetched from API
    },
  ];

  return (
    <DashboardCard
      title="Predictive Spending"
      action={
        <Select
          labelId="timeperiod-select-label"
          id="timeperiod-select"
          value={timePeriod}
          onChange={handleChange}
        >
          <MenuItem value="1">Next Week</MenuItem>
          <MenuItem value="2">Next Month</MenuItem>
          <MenuItem value="3">Next Year</MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="350px" // Match the height with the options
      />
    </DashboardCard>
  );
};

export default PredictiveSpending;
