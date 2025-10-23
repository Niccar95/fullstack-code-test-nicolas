import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSensor } from "../services/sensorService";
import type { Sensor } from "../types/sensor";
import { getReadings } from "../services/readingService";
import type { Reading } from "../types/reading";
import ReadingsChart from "../components/ReadingsChart";

const SensorDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [readings, setReadings] = useState<Reading[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [timestampFrom, setTimestampFrom] = useState<string>("");
  const [timestampTo, setTimestampTo] = useState<string>("");

  useEffect(() => {
    const fetchSensor = async () => {
      if (!id) return;

      const response = await getSensor(Number(id));
      if (response.success && response.data) {
        setSensor(response.data);
      }
      setLoading(false);
    };

    fetchSensor();
  }, [id]);

  useEffect(() => {
    const fetchSensorReadings = async () => {
      if (!id) return;

      const response = await getReadings(
        Number(id),
        timestampFrom,
        timestampTo
      );
      if (response.success && response.data) {
        setReadings(response.data);
      }
      setLoading(false);
    };

    fetchSensorReadings();
  }, [id, timestampFrom, timestampTo]);

  const handleReadingsFilter = (timestampFrom: string, timestampTo: string) => {
    setTimestampFrom(timestampFrom);
    setTimestampTo(timestampTo);
  };

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
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-[#4B4A7F] mb-3">{sensor.name}</h1>
            <div className="mt-2 text-gray-600 space-y-1">
              <p className="text-sm"><span className="font-medium">Sensor ID:</span> {id}</p>
              <p className="text-sm"><span className="font-medium">Model:</span> {sensor.model}</p>
              {sensor.description && <p className="text-sm"><span className="font-medium">Description:</span> {sensor.description}</p>}
            </div>
          </div>
          {readings && (
            <ReadingsChart
              readings={readings}
              handleReadingsFilter={handleReadingsFilter}
            />
          )}
        </>
      )}
    </section>
  );
};

export default SensorDetails;
