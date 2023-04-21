import React, { useState, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import MapsChart from "./MapsChart";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

interface HistoricalData {
  cases: {
    [date: string]: number;
  };
}
interface totalData{
    cases:string,
    deaths:string,
    recovered:string,
    active:string,
    todayCases:string,
    todayRecovered:string,
    todayDeaths:string
}

const LineCharts = () => {
  const [data, setData] = useState<HistoricalData | null>(null); 
  const [totalCases, settotalCases] = useState<totalData | null>(null); 
  // Update data state type

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        const caseresponse = await fetch(
            "https://disease.sh/v3/covid-19/all"
        );
        if (!response.ok || !caseresponse.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        const totalresult = await caseresponse.json();
        setData(result);
        settotalCases(totalresult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
console.log(totalCases)
  const chartData = {
    labels: Object.keys(data?.cases || {}), // Add optional chaining
    datasets: [
      {
        label: "Covid19 Cases",
        data: Object.values(data?.cases || {}), // Add optional chaining
        fill: false,
        borderColor: "black",
        pointBorderColor:'black',
        tension: 0.4,
      },
    ],
  };
  if(!data || !totalCases){
    return <h1 className="text-2xl mx-auto">Loading...</h1>
  }

  return (
    <div className="flex flex-row">
    <div className="flex flex-col justify-center bg-white py-4 text-center rounded-md mt-1 shadow-lg w-[500px] h-[90vh]">
      <h1 className="text-3xl font-bold mb-4">Covid-19 Historical Data</h1>
      <div className="flex flex-wrap gap-2 px-2  justify-center pb-4">
        <div className="shadow-md p-1">TotalCases :{totalCases?.cases}<span className="mx-2 text-red-500">+{totalCases?.todayCases}</span></div>
        <div className="shadow-md p-1">TotalDeaths :{totalCases?.deaths}<span className="mx-2 text-red-500">+{totalCases?.todayDeaths}</span></div>
        <div className="shadow-md p-1">TotalRecovered :{totalCases?.recovered}<span className="mx-2 text-green-500">+{totalCases?.todayRecovered}</span></div>
        <div className="shadow-md p-1">ActiveCases :{totalCases?.active}</div>

      </div>
      {data && Object.keys(data).length > 0 && <Line data={chartData}  />} 
    </div>
    <div>
        <MapsChart/>
    </div>
    </div>
  );
};

export default LineCharts;
