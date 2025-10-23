import { useEffect, useState } from "react";
import { getSensors } from "../services/sensorService";
import SensorList from "../components/SensorList";
import Pagination from "../components/Pagination";
import type { Sensor } from "../types/sensor";

const Dashboard = () => {
  const [sensors, setSensors] = useState<Sensor[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);

  useEffect(() => {
    const fetchSensors = async () => {
      const response = await getSensors(searchQuery, page, pageSize);

      if (response.success) {
        console.log("Sensors fetched", response);
        setSensors(response.data);
      } else {
        console.log("Failed to fetch sensors", response.error);
      }
    };

    fetchSensors();
  }, [searchQuery, page, pageSize]);

  const refetchSensors = async () => {
    const response = await getSensors(searchQuery, page, pageSize);
    if (response.success) {
      setSensors(response.data);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  return (
    <section>
      <h1>Welcome back!</h1>
      {sensors ? (
        <>
          <SensorList sensorList={sensors} sensorSearch={handleSearch} refetchSensors={refetchSensors} />
          {sensors.length > 0 ? (
            <Pagination
              currentPage={page}
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              more={sensors.length === pageSize}
            />
          ) : (
            <p className="text-gray-600 mt-4">
              No sensors found. Try a different search or add a new sensor.
            </p>
          )}
        </>
      ) : (
        <p className="text-gray-600">Loading...</p>
      )}
    </section>
  );
};

export default Dashboard;
