import type { Sensor as SensorType } from "../types/sensor";

interface SensorProps {
  sensor: SensorType;
}

const Sensor = ({ sensor }: SensorProps) => {
  return (
    <li className="grid grid-cols-3 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex items-center">{sensor.id}</div>
      <div className="flex items-center">{sensor.name}</div>
      <button className="flex items-center w-fit">More Details</button>
    </li>
  );
};

export default Sensor;
