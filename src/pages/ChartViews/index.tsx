import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { UserData, chartTypes } from "../../common/constant";
import { BarChartData } from "../../common/types";
import Chart from "../../components/Chart";
import { ChartTypeRegistry } from "chart.js";
import "./style.css";

const ChartViews = () => {
  const generateColors = (numColors: number): string[] => {
    const colors = [];
    for (let i = numColors; i > 0; i--) {
      const hue = (i * 360) / numColors; // Distribute colors evenly across the color wheel
      colors.push(`hsl(${hue}, 70%, 50%)`); // Use 70% saturation and 50% lightness for vivid colors
    }
    return colors;
  };
  const [chartData] = useState<BarChartData>(() => {
    const colors = generateColors(UserData?.length);
    return {
      labels: UserData.map((data) => String(data.year)),
      datasets: [
        {
          label: "User Gained",
          data: UserData.map((data) => data.userGain),
          backgroundColor: colors,
          borderColor: colors.map((color) => color.replace("0.4", "1")), // Adjust border color if needed
          borderWidth: 1,
        },
      ],
    };
  });
  return (
    <Row style={{ width: "100%" }}>
      {chartTypes.map((chartType) => (
        <Col className="each-chart" lg={3} md={4} sm={12} key={chartType}>
          <Chart
            type={chartType as keyof ChartTypeRegistry}
            chartData={chartData}
            chartOptions={{
              plugins: {
                legend: {
                  position: "right", // Position the legend on the right
                  labels: {
                    color: "blue", // Change legend label color
                    font: {
                      size: 14, // Font size
                      weight: "bold", // Make font bold
                    },
                    generateLabels: (chart: any) => {
                      const dataset = chart.data.datasets[0];
                      return dataset.data.map((data: any, index: number) => ({
                        text: `${data}(${chart.data.labels[index]})`,
                        fillStyle: dataset.backgroundColor[index],
                        strokeStyle: dataset.borderColor[index],
                        lineWidth: dataset.borderWidth,
                      }));
                    },
                    boxWidth: 20, // Width of the colored box
                    boxHeight: 20, // Height of the colored box
                  },
                  align: "center", // Align the legend items vertically
                },
              },
            }}
            width="100%"
            height="100%"
          />
        </Col>
      ))}
    </Row>
  );
};

export default ChartViews;
