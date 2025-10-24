import { useState } from "react";
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
  handleReadingsFilter: (timestampFrom: string, timestampTo: string) => void;
}

const ReadingsChart = ({ readings, handleReadingsFilter }: IReadingProps) => {
  const [timestampFrom, setTimestampFrom] = useState("");
  const [timestampTo, setTimestampTo] = useState("");

  const data = readings.map((reading) => ({
    temperature: reading.temperature,
    humidity: reading.humidity,
    timestamp: new Date(reading.timestamp).toLocaleString(),
  }));

  const handleFromChange = (value: string) => {
    setTimestampFrom(value);
    handleReadingsFilter(value, timestampTo);
  };

  const handleToChange = (value: string) => {
    setTimestampTo(value);
    handleReadingsFilter(timestampFrom, value);
  };

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <div>
          <label className="block mb-2 font-medium">From Date & Time:</label>
          <input
            type="datetime-local"
            value={timestampFrom}
            onChange={(e) => handleFromChange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full sm:w-auto"
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">To Date & Time:</label>
          <input
            type="datetime-local"
            value={timestampTo}
            onChange={(e) => handleToChange(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-full sm:w-auto"
          />
        </div>
      </div>
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
    </>
  );
};

export default ReadingsChart;
