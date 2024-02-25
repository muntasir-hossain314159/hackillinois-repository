"use client";

import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { generateResponse } from "./git-call";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PredictiveSpending = () => {
  const [month, setMonth] = useState("1");
  const [loading, setLoading] = useState(true);
  const [savingGoal, setSavingGoal] = useState(100);

  const [chartData, setChartData] = useState({
    predicted_daily_savings: [],
    predicted_daily_costs: [],
  });

  useEffect(() => {
    fetchData();
  }, [month, savingGoal]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const transactions = await response.json();

      const formattedData = JSON.stringify(transactions);
      const gptResponse = await generateResponse(formattedData, savingGoal);
      const { predicted_daily_savings, predicted_daily_costs } =
        JSON.parse(gptResponse);
      console.log(`GPT Response: ${gptResponse}`);
      setChartData({ predicted_daily_savings, predicted_daily_costs });
    } catch (error) {
      console.error("Error fetching data or generating response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  const theme = useTheme();
  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    colors: [theme.palette.success.main, theme.palette.error.main],
    legend: {
      position: "top",
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: "Predicted Daily Savings",
      data: chartData.predicted_daily_savings,
    },
    {
      name: "Predicted Daily Costs",
      data: chartData.predicted_daily_costs,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardCard
      title="Predictive Spending Analysis"
      action={
        <Select value={month} onChange={handleChange} size="small">
          <MenuItem value="1">This Week</MenuItem>
          <MenuItem value="2">This Month</MenuItem>
          <MenuItem value="3">This Year</MenuItem>
        </Select>
      }
    >
      <Chart options={options} series={series} type="bar" height="415px" />
    </DashboardCard>
  );
};

export default PredictiveSpending;
