import { useEffect, useState } from "react";
import { getSensors } from "../services/sensorService";
import type { Sensor } from "../types/sensor";

export const useFetchSensors = (
  searchQuery: string,
  page: number,
  pageSize: number,
  setHasMore: (hasMore: boolean) => void
) => {
  const [sensors, setSensors] = useState<Sensor[]>();

  useEffect(() => {
    const fetchSensors = async () => {
      const response = await getSensors(searchQuery, page, pageSize);

      if (response.success) {
        console.log("Sensors fetched", response);
        setSensors(response.data);
        setHasMore(response.has_more || false);
      } else {
        console.log("Failed to fetch sensors", response.error);
      }
    };

    fetchSensors();
  }, [searchQuery, page, pageSize, setHasMore]);

  const refetchSensors = async () => {
    const response = await getSensors(searchQuery, page, pageSize);
    if (response.success) {
      setSensors(response.data);
      setHasMore(response.has_more || false);
    }
  };

  return {
    sensors,
    refetchSensors,
  };
};
