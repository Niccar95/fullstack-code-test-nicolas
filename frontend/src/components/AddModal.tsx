import { useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";

interface AddModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addSensor?: (name: string, description: string, model: string) => void;
  addReading?: (temperature: number, humidity: number) => void;
}

const AddModal = ({ isOpen, closeModal, addSensor, addReading }: AddModalProps) => {
  const location = useLocation();
  const isDetailsPage = location.pathname.includes("/sensors/");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");

  const [nameError, setNameError] = useState("");
  const [modelError, setModelError] = useState("");
  const [temperatureError, setTemperatureError] = useState("");
  const [humidityError, setHumidityError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isDetailsPage && addReading) {
      let hasError = false;

      if (!temperature) {
        setTemperatureError("Temperature is required");
        hasError = true;
      } else if (Number(temperature) < -100 || Number(temperature) > 100) {
        setTemperatureError("Temperature must be between -100 and 100");
        hasError = true;
      } else {
        setTemperatureError("");
      }

      if (!humidity) {
        setHumidityError("Humidity is required");
        hasError = true;
      } else if (Number(humidity) < 0 || Number(humidity) > 100) {
        setHumidityError("Humidity must be between 0 and 100");
        hasError = true;
      } else {
        setHumidityError("");
      }

      if (hasError) return;

      addReading(Number(temperature), Number(humidity));
      setTemperature("");
      setHumidity("");
      setTemperatureError("");
      setHumidityError("");
      closeModal();
      return;
    }

    if (addSensor) {
      let hasError = false;

      if (!name) {
        setNameError("Name is required");
        hasError = true;
      } else if (name.length < 3) {
        setNameError("Name must be at least 3 characters");
        hasError = true;
      } else {
        setNameError("");
      }

      if (!model) {
        setModelError("Model is required");
        hasError = true;
      } else if (model.length < 2) {
        setModelError("Model must be at least 2 characters");
        hasError = true;
      } else {
        setModelError("");
      }

      if (hasError) return;

      addSensor(name, description, model);
      setName("");
      setDescription("");
      setModel("");
      setNameError("");
      setModelError("");
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {isDetailsPage ? "Add New Reading" : "Add New Sensor"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {isDetailsPage ? (
            <>
              <div>
                <label htmlFor="temperature" className="block mb-2 font-medium">
                  Temperature
                </label>
                <input
                  id="temperature"
                  type="number"
                  step="0.01"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {temperatureError && (
                  <div className="text-red-500 text-sm mt-1">{temperatureError}</div>
                )}
              </div>

              <div>
                <label htmlFor="humidity" className="block mb-2 font-medium">
                  Humidity
                </label>
                <input
                  id="humidity"
                  type="number"
                  step="0.01"
                  value={humidity}
                  onChange={(e) => setHumidity(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {humidityError && (
                  <div className="text-red-500 text-sm mt-1">{humidityError}</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {nameError && (
                  <div className="text-red-500 text-sm mt-1">{nameError}</div>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block mb-2 font-medium">
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label htmlFor="model" className="block mb-2 font-medium">
                  Model
                </label>
                <input
                  id="model"
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                {modelError && (
                  <div className="text-red-500 text-sm mt-1">{modelError}</div>
                )}
              </div>
            </>
          )}

          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
            >
              {isDetailsPage ? "Add Reading" : "Add Sensor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
