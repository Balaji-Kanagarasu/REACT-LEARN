import { ChartData } from "chart.js";

interface Dataset {
  label: string;
  data: (number | [number, number] | null)[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
}

export interface BarChartData extends ChartData<"bar"> {
  labels: string[];
  datasets: Dataset[];
}
