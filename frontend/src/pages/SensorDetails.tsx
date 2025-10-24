import { useParams, useNavigate } from "react-router-dom";
import ReadingsChart from "../components/ReadingsChart";
import AddModal from "../components/AddModal";
import { useSensorDetails } from "../hooks/useSensorDetails";

const SensorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    sensor,
    readings,
    loading,
    isModalOpen,
    setIsModalOpen,
    handleReadingsFilter,
    handleAddReading,
  } = useSensorDetails(id);

  return (
    <section>
      {loading ? (
        <p>Loading sensor details...</p>
      ) : !sensor ? (
        <p>Sensor not found</p>
      ) : (
        <>
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-8 text-[#4B4A7F] hover:text-[#3d3a66] cursor-pointer"
          >
            ← Back to Dashboard
          </button>
          <div className="mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-[#4B4A7F] mb-3">
                {sensor.name}
              </h1>
              <div className="mt-2 text-gray-600 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Sensor ID:</span> {id}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Model:</span> {sensor.model}
                </p>
                {sensor.description && (
                  <p className="text-sm">
                    <span className="font-medium">Description:</span>{" "}
                    {sensor.description}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-[#4B4A7F] text-white rounded hover:bg-[#3d3a66] focus:outline-none focus:ring-2 focus:ring-[#4B4A7F] focus:ring-offset-2 cursor-pointer"
            >
              Add Reading
            </button>
          </div>
          {readings && (
            <ReadingsChart
              readings={readings}
              handleReadingsFilter={handleReadingsFilter}
            />
          )}
          <AddModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            addReading={handleAddReading}
          />
        </>
      )}
    </section>
  );
};

export default SensorDetails;
