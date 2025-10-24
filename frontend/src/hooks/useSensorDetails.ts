import { useEffect, useState } from "react";
import { getSensor } from "../services/sensorService";
import { getReadings, addReading } from "../services/readingService";
import type { Sensor } from "../types/sensor";
import type { Reading } from "../types/reading";

export const useSensorDetails = (id: string | undefined) => {
  const [sensor, setSensor] = useState<Sensor | null>(null);
  const [readings, setReadings] = useState<Reading[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [timestampFrom, setTimestampFrom] = useState<string>("");
  const [timestampTo, setTimestampTo] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    const fromISO = timestampFrom ? new Date(timestampFrom).toISOString() : "";
    const toISO = timestampTo ? new Date(timestampTo).toISOString() : "";
    setTimestampFrom(fromISO);
    setTimestampTo(toISO);
  };

  const refetchReadings = async () => {
    if (!id) return;
    const response = await getReadings(Number(id), timestampFrom, timestampTo);
    if (response.success && response.data) {
      setReadings(response.data);
    }
  };

  const handleAddReading = async (temperature: number, humidity: number) => {
    if (!id) return;
    const response = await addReading(Number(id), temperature, humidity);
    if (response.success) {
      refetchReadings();
    }
  };

  return {
    sensor,
    readings,
    loading,
    isModalOpen,
    setIsModalOpen,
    handleReadingsFilter,
    handleAddReading,
  };
};
