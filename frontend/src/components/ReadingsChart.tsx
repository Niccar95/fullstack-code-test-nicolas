import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Reading } from "../types/reading";

interface IReadingProps {
  readings: Reading[];
}

const ReadingsChart = ({ readings }: IReadingProps) => {
  const data = readings.map((reading) => ({
    temperature: reading.temperature,
    humidity: reading.humidity,
    timestamp: new Date(reading.timestamp).toLocaleString(),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          minTickGap={100}
          tick={{ fontSize: 10 }}
          angle={-15}
          textAnchor="end"
          height={80}
        />
        <YAxis
          yAxisId="left"
          label={{
            value: "Temperature (°C)",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{
            value: "Humidity (%)",
            angle: 90,
            position: "insideRight",
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="temperature"
          stroke="#ef4444"
          name="Temperature (°C)"
          dot={false}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="humidity"
          stroke="#3b82f6"
          name="Humidity (%)"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ReadingsChart;
