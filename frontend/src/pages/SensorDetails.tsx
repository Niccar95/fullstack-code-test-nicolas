import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSensor } from "../services/sensorService";
import type { Sensor } from "../types/sensor";
import { getReadings } from "../services/readingService";
import type { Reading } from "../types/reading";
import ReadingsChart from "../components/ReadingsChart";

const SensorDetails = () => {
  const { id } = useParams<{ id: string }>();
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
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{sensor.name}</h1>
            <div className="mt-2 text-gray-600">
              <p>Sensor ID: {id}</p>
              <p>Model: {sensor.model}</p>
              {sensor.description && <p>Description: {sensor.description}</p>}
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
