import {
  ChartOptions,
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  registerables,
  ChartTypeRegistry,
} from "chart.js";
import PropTypes from "prop-types";
import React from "react";
import { Chart as AllChart } from "react-chartjs-2";
import { BarChartData } from "../../common/types";
import "./style.css";

interface ChartProps {
  type: keyof ChartTypeRegistry;
  chartData: BarChartData;
  chartOptions?: ChartOptions<any>;
  height?: string;
  width?: string;
  userPlugin?: string;
}

ChartJS.register(...registerables, ArcElement, Tooltip, Legend);

const Chart: React.FC<ChartProps> = ({
  type,
  chartData,
  chartOptions,
  height,
  width,
  userPlugin,
  ...rest
}) => {
  return (
    <div style={{ height, width }} className="chart-bg">
      <label className="chart-label">{`The ${type} Chart`}</label>
      <AllChart
        type={type}
        data={chartData}
        options={chartOptions}
        plugins={[...(userPlugin ?? ([] as any))]}
        {...rest}
      />
    </div>
  );
};

Chart.propTypes = {
  chartData: PropTypes.any.isRequired,
  chartOptions: PropTypes.object,
};

export default Chart;
