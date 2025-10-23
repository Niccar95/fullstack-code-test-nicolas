import { useState, type FormEvent } from "react";

interface AddSensorModalProps {
  isOpen: boolean;
  closeModal: () => void;
  addSensor: (name: string, description: string, model: string) => void;
}

const AddSensorModal = ({ isOpen, closeModal, addSensor }: AddSensorModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addSensor(name, description, model);
    setName("");
    setDescription("");
    setModel("");
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Sensor</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
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
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

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
              Add Sensor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSensorModal;
