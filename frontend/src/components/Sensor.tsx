import { useNavigate } from "react-router-dom";
import type { Sensor as SensorType } from "../types/sensor";

interface SensorProps {
  sensor: SensorType;
}

const Sensor = ({ sensor }: SensorProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/dashboard/sensors/${sensor.id}`);
  };

  return (
    <li className="grid grid-cols-4 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center">{sensor.id}</div>
      <div className="flex items-center min-w-0">
        <span className="block truncate md:whitespace-normal">{sensor.name}</span>
      </div>
      <div className="flex items-center min-w-0">
        <span className="block truncate md:whitespace-normal">{sensor.model}</span>
      </div>
      <button
        onClick={handleViewDetails}
        className="flex items-center w-fit text-[#4B4A7F] hover:underline focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 rounded cursor-pointer"
      >
        More Details
      </button>
    </li>
  );
};

export default Sensor;
