"use client";

import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { generateResponse } from "./git-call";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PredictiveSpending = () => {

  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    predicted_daily_costs: [{x: Date, y: Number}]
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      const formattedData: string = formatData(data.transactions);
      const gptResponse = await generateResponse(formattedData);
      const { predicted_daily_costs } = JSON.parse(gptResponse);
      console.log(`GPT Response: ${gptResponse}`);
      setChartData({predicted_daily_costs});
    } catch (error) {
      console.error("Error fetching data or generating response:", error);
    } finally {
      setLoading(false);
    }
  };


  function formatData(transactions: any[]): string {
    const formattedData: any[] = [];

    transactions.forEach((element: { authorized_date: any; amount: any; }) => {
        // Check if there's already an entry for the date in formattedData
        const existingEntry = formattedData.find(entry => entry.date === element.authorized_date);

        if (existingEntry) {
            // If the entry exists, add the amount to it
            existingEntry.amount += element.amount;
        } else {
            // If the entry doesn't exist, create a new entry
            formattedData.push({ date: element.authorized_date, amount: element.amount });
        }
    });

    const jsonString = JSON.stringify(formattedData);

    return jsonString;
  }

  const theme = useTheme();
  // const options = {
  //   chart: {
  //     type: "bar",
  //     stacked: true,
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //     },
  //   },
  //   xaxis: {
  //     categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  //   },
  //   colors: [theme.palette.success.main, theme.palette.error.main],
  //   legend: {
  //     position: "top",
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //   },
  // };

  const options: ApexOptions = {
    series: [{
      name: 'Expenditure',
      data: chartData.predicted_daily_costs
    }],
    chart: {
      type: 'area',
      stacked: false,
      height: 415,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
    title: {
      text: 'Predicted Daily Costs',
      align: 'left'
    },
    fill: {
      type: 'gradient',
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
      title: {
        text: 'Cost'
      },
    },
    xaxis: {
      type: 'datetime',
    }
  };

  const series = [
    {
      name: "Predicted Daily Costs",
      data: chartData.predicted_daily_costs,
    },
  ];

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardCard
      title="Predictive Spending Analysis"
    >
      <Chart options={options} series={options.series} type="line" height={options.chart?.height} />
    </DashboardCard>
  );
};

export default PredictiveSpending;
