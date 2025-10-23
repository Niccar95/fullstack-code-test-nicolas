import { useState } from "react";
import { addSensor } from "../services/sensorService";
import type { Sensor as SensorType } from "../types/sensor";
import Sensor from "./Sensor";
import AddSensorModal from "./AddSensorModal";

interface ISensorListProps {
  sensorList: SensorType[];
  sensorSearch: (query: string) => void;
  refetchSensors: () => void;
}

const SensorList = ({
  sensorList,
  sensorSearch,
  refetchSensors,
}: ISensorListProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleAddSensor = async (
    name: string,
    description: string,
    model: string
  ) => {
    const response = await addSensor(name, description, model);
    if (response.success) {
      console.log("Sensor added successfully!", response.data);
      refetchSensors();
    } else {
      console.error("Failed to add sensor:", response.error);
    }
  };

  return (
    <section className="mt-6">
      <button
        onClick={() => setShowModal(true)}
        className="w-fit p-3 mb-8 bg-[#4B4A7F] text-white font-semibold rounded transition hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
      >
        Add Sensor
      </button>
      <div className="mb-4">
        <label htmlFor="search" className="block mb-2 font-medium">
          Search sensors by name or model:
        </label>
        <input
          id="search"
          type="text"
          onChange={(e) => sensorSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      <AddSensorModal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        addSensor={handleAddSensor}
      />

      <div className="grid grid-cols-4 gap-4 p-4 font-semibold border-b border-gray-300 bg-gray-50">
        <div>ID</div>
        <div>Name</div>
        <div>Model</div>
        <div></div>
      </div>
      <ul>
        {sensorList.map((sensor) => (
          <Sensor key={sensor.id} sensor={sensor} />
        ))}
      </ul>
    </section>
  );
};

export default SensorList;
