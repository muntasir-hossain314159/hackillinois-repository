import React from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { Numbers } from "@mui/icons-material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  // select
  const [month, setMonth] = React.useState("1");

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  // chart color
  const theme = useTheme();
  const primary = theme.palette.success.main;
  const secondary = theme.palette.warning.main;
  const tertiary = theme.palette.error.main;

  const dailyBudget: number = 100;

  const dailySavings: number[] = [66, 44, 48, 49, 39, 37, 22];
  const dailyCosts: number[] = [58, 13, 21, 45, 38, 17, 61];
  const maxDailyBudget = Math.max(
    ...dailySavings.map((saving, index) => saving + dailyCosts[index])
  );

  // chart
  const optionscolumnchart: ApexCharts.ApexOptions = {
    annotations: {
      yaxis: [
        {
          y: maxDailyBudget,
          borderColor: "#FFA07A", // Lighter red color
          label: {
            borderColor: "#FFA07A",
            style: {
              color: "#fff",
              background: "#FFA07A",
            },
            text: "Most Spent Day",
          },
        },
      ],
    },
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: true,
      },
      height: 400,
      stacked: true, // Enable stacked bar chart
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true, // Show legend to differentiate the segments
      position: "top",
      horizontalAlign: "left",
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
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart: any = [
    {
      name: "Daily Savings",
      data: dailySavings,
    },
    {
      name: "Daily Costs",
      data: dailyCosts,
    },
  ];

  return (
    <DashboardCard
      title="Weekly Spending"
      action={
        <Select
          labelId="month-dd"
          id="month-dd"
          value={month}
          size="small"
          onChange={handleChange}
        >
          <MenuItem value={1}>This Week</MenuItem>
          <MenuItem value={2}>Last Month</MenuItem>
          <MenuItem value={3}>Last 3 Months</MenuItem>
        </Select>
      }
    >
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height="400px"
      />
    </DashboardCard>
  );
};

export default SalesOverview;
