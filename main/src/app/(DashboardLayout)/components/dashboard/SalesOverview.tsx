"use client"

import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import dynamic from "next/dynamic";
import { Numbers } from "@mui/icons-material";
import { generateResponse } from "../../API/gpt-call";
import {
  Box,
  Button,
} from "@mui/material";
import { BudgetPlanDialog } from "./BudgetPlanDialog";


const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SalesOverview = () => {
  // select
  const [month, setMonth] = React.useState("1");
  const [loading, setLoading] = useState(true);
  const [predictedTransactions, setPredictedTransactions] = useState("");
  const [saving, setSavings] = useState(100);
  const [retryCount, setRetryCount] = useState(0);

  const handleChange = (event: any) => {
    setMonth(event.target.value);
  };

  useEffect(() => {
      fetchData();
  }, [retryCount, saving]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/transactions");
      const data = await response.json();
      console.log(data);
      const formattedData: string = formatData(data.transactions);
      console.log(`Saving: ${saving}`);
      const gptResponse = await generateResponse(formattedData, saving);
      console.log(`CHAT GPT ${gptResponse}`);
      setPredictedTransactions(gptResponse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setRetryCount(retryCount + 1);
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

//get current date
//get transactions again
//


  // chart color
  const theme = useTheme();
  const primary = theme.palette.success.main;
  const secondary = theme.palette.warning.main;
  const tertiary = theme.palette.error.main;

  const dailyBudget: number = 100;

  interface budgetObject {
    daily_costs: number[];
    daily_savings: number[];
}

  let dailySavings: number[] ;
  let dailyCosts: number[];
  let maxDailyBudget: number;

    try {
      let obj: budgetObject = JSON.parse(predictedTransactions);
      dailySavings = obj.daily_costs //[10, 10, 10, 10, 10, 10, 10];
      dailyCosts = obj.daily_savings //[58, 13, 21, 45, 38, 17, 61];
      maxDailyBudget = Math.max(
        ...dailySavings.map((saving, index) => saving + dailyCosts[index])
      );
  } catch(error) {
    dailySavings = [10, 10, 10, 10, 10, 10, 10];
    dailyCosts = [58, 13, 21, 45, 38, 17, 61];
    maxDailyBudget = Math.max(
      ...dailySavings.map((saving, index) => saving + dailyCosts[index])
    );
  }



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
      height: 425,
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

  // State to control the opening of the budget plan dialog
  const [isBudgetPlanDialogOpen, setBudgetPlanDialogOpen] = useState(false);

  // Function to open the dialog
  const handleOpenBudgetPlanDialog = () => {
    setBudgetPlanDialogOpen(true);
    
  };

  // Function to close the dialog
  const handleCloseBudgetPlanDialog = () => {
    setBudgetPlanDialogOpen(false);
  };

  function updateSaving(amount: number) {
    setSavings(amount);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
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
          height="440px"
        />
      </DashboardCard>
      <Box display="flex" justifyContent="center" paddingTop={2}>
        <Button
          variant="contained"
          color="info"
          onClick={handleOpenBudgetPlanDialog}
          size="large"
          fullWidth={true}
        >
          Start My Budget Plan
        </Button>

        <BudgetPlanDialog
          open={isBudgetPlanDialogOpen}
          onClose={handleCloseBudgetPlanDialog}
          updateSaving={updateSaving}
        />
      </Box>
    </>

  );
};

export default SalesOverview;
