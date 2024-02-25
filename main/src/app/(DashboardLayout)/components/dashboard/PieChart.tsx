import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { Grid, Typography, Box } from "@mui/material";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";

const YearlyBreakup = () => {
  const theme = useTheme();

  const categories: (keyof typeof categoryColors)[] = [
    "Grocery shopping",
    "Gasoline",
    "Utility bill",
    "Restaurant",
    "Online purchase",
    "Clothing",
    "Entertainment",
  ];

  const categoryColors: { [key: string]: string } = {
    "Grocery shopping": "#FFA07A", // Light Salmon
    "Gasoline": "#FFD700", // Gold
    "Utility bill": "#87CEEB", // Sky Blue
    "Restaurant": "#32CD32", // Lime Green
    "Online purchase": "#BA55D3", // Medium Orchid
    "Clothing": "#FF4500", // Orange Red
    "Entertainment": "#20B2AA", // Light Sea Green
  };

  const seriesData = [120, 80, 70, 90, 100, 60, 50]; // Replace with actual data

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    labels: categories.map((category) => category.toString()),
    legend: {
      show: true,
      offsetY: 0,
      position: "right", // Adjust the legend position if necessary
      fontSize: "14px", // Adjust font size for better readability
      formatter: function (
        seriesName: string,
        opts: {
          w: { globals: { series: { [x: string]: string } } };
          seriesIndex: string | number;
        }
      ) {
        return seriesName + ": $" + opts.w.globals.series[opts.seriesIndex];
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            name: {
              show: false,
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 600,
              color: "#373d3f",
              offsetY: -10,
              formatter: function (val: any) {
                return val;
              },
            },
            value: {
              show: false,
            },
            total: {
              show: false,
            },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: categories.map((category) => categoryColors[category]),

    dataLabels: {
      enabled: false, // Disable data labels to avoid clutter
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$" + val; // Format tooltip value as currency
        },
      },
    },
  };

  return (
    <DashboardCard title="Yearly Breakup">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center" }}>
            <Chart
              options={{
                ...options,
                chart: { ...options.chart, type: "donut" },
              }}
              series={seriesData}
              type="donut"
              height={200}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
