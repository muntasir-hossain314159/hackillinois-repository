"use client";

import dynamic from "next/dynamic";
import { Box, Typography, Chip } from "@mui/material";
import { useState, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const YearlyBreakup = () => {
  const [loading, setLoading] = useState(true);
  const [expensesByCategory, setExpensesByCategory] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/yearly_breakup");
      const data = await response.json();
      setExpensesByCategory(data.expenses_by_category);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const chartColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#C9CBCF",
    "#FF6384",
  ];

  function getKeysAndValues(inputDict: Record<string, number>): {
    keys: string[];
    values: number[];
  } {
    const keys = Object.keys(inputDict);
    const values = keys.map((key) => inputDict[key]);
    return { keys, values };
  }

  const result = getKeysAndValues(expensesByCategory);
  const categories = result.keys;
  const seriesData = result.values;

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      toolbar: {
        show: false,
      },
    },
    colors: chartColors,
    labels: categories.map((category) =>
      category.toString().replace(/_/g, " ")
    ),

    legend: {
      show: false, // Hide the default legend
    },
    plotOptions: {
      pie: {
        donut: {
          size: "60%", // Increase the donut size
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$" + val;
        },
      },
    },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardCard title="Yearly Breakup">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 650, height: "auto" }}>
          <Chart
            options={options}
            series={seriesData}
            type="donut"
            height="350"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
            mt: 2,
          }}
        >
          {categories.map((category, index) => (
            <Chip
              label={category.replace(/_/g, " ")} // Replace underscores with spaces
              key={index}
              sx={{
                bgcolor: chartColors[index % chartColors.length],
                color: "white",
              }}
            />
          ))}
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default YearlyBreakup;
