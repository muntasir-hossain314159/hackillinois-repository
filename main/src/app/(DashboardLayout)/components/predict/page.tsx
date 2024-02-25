"use client";

import React, { useEffect, useState } from "react";
import { Select, MenuItem, useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import Head from "next/head";
import { ApexOptions } from "apexcharts";

import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const PredictiveSpending: NextPage = () => {
  const [data, setData] = useState({ savings: [], costs: [] });

  useEffect(() => {
    fetch("/api/predictive-data")
      .then((response) => response.json())
      .then((data) => {
        setData({ savings: data.savings, costs: data.costs });
      });
  }, []);

  const [timePeriod, setTimePeriod] = React.useState("1");
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTimePeriod(event.target.value as string);
  };

  const theme = useTheme();
  const colors = [
    "#FFA07A",
    "#FFD700",
    "#87CEEB",
    "#32CD32",
    "#BA55D3",
    "#FF4500",
    "#20B2AA",
  ];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      foreColor: theme.palette.text.secondary,
      toolbar: {
        show: true,
      },
      height: 350,
      stacked: true,
    },
    colors: colors,
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: "right",
      fontSize: "16px",
      markers: {
        width: 16,
        height: 16,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
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

  const series = [
    {
      name: "Predicted Savings",
      data: data.savings,
    },
    {
      name: "Predicted Costs",
      data: data.costs,
    },
  ];

  return (
    <>
      <Head>
        <title>Predictive Spending</title>
        <meta name="description" content="Predictive Spending Analysis" />
      </Head>
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
        <Chart options={options} series={series} type="bar" height="350" />
      </DashboardCard>
    </>
  );
};

export default PredictiveSpending;
