"use client";
import { Grid, Box, Button } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
// components
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import PieChart from "@/app/(DashboardLayout)/components/dashboard/PieChart";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import Blog from "@/app/(DashboardLayout)/components/dashboard/Blog";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import PredictiveSpending from "./components/dashboard/PredictiveSpending";
import ExpenseChart from "./components/dashboard/ExpenseChart";
import { BudgetPlanDialog } from "./components/dashboard/BudgetPlanDialog";
import { useState } from "react";

function Dashboard() {
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
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <SalesOverview/>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <PieChart />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}

export default Dashboard;
