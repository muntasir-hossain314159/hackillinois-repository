import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ExpenseData {
  day: string;
  actualCost: number;
  actualSavings: number;
  targetCost: number;
  targetSavings: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
  reserve: number;
  setReserve: (newReserve: number) => void;
}

const fallbackData: ExpenseData[] = [
    // Define some default data
    { day: 'Sunday', actualCost: 50, actualSavings: 10, targetCost: 60, targetSavings: 20 },
    { day: 'Monday', actualCost: 40, actualSavings: 15, targetCost: 55, targetSavings: 25 },
    // ... more default data for other days
  ];

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data, reserve, setReserve }) => {
    if (!data) {
        // Return null, a loading spinner, or some placeholder content
        // if data is not yet available.
        data = fallbackData;
      };
    
      // Now that we've checked for data, we can safely use .map
      const series = [
        {
          name: 'Actual Cost',
          data: data.map((item) => item.actualCost),
        },
        {
          name: 'Actual Savings',
          data: data.map((item) => item.actualSavings),
        }
      ];

  // Calculate reserve adjustments based on actual spending
  React.useEffect(() => {
    let newReserve = reserve;
    data.forEach((item) => {
      if (item.actualCost < item.targetCost) {
        newReserve += item.targetCost - item.actualCost;
      } else {
        newReserve -= item.actualCost - item.targetCost;
      }
    });
    setReserve(newReserve);
  }, [data, reserve, setReserve]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: data.map((item) => item.day),
    },
    annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#FF4560',
            label: {
              borderColor: '#FF4560',
              style: {
                color: '#fff',
                background: '#FF4560'
              },
              text: 'Y-axis annotation for first series'
            },
            yAxisIndex: 0, // This is for the first Y-axis (typically the default)
          },
          {
            y: 70,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396'
              },
              text: 'Y-axis annotation for second series'
            },
            yAxisIndex: 1, // This is for the second Y-axis
          }
          // Add more annotations as needed
        ],
      },
    // ...rest of the options
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
    />
  );
};

export default ExpenseChart;
