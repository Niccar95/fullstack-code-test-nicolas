import SensorList from "../components/SensorList";
import Pagination from "../components/Pagination";
import { usePagination } from "../hooks/usePagination";
import { useFetchSensors } from "../hooks/useFetchSensors";

const Dashboard = () => {
  const { page, pageSize, hasMore, searchQuery, setHasMore, handleNextPage, handlePreviousPage, handleSearch } = usePagination();
  const { sensors, refetchSensors } = useFetchSensors(searchQuery, page, pageSize, setHasMore);

  return (
    <section>
      <h1 className="text-4xl font-bold text-[#4B4A7F] mb-2">Welcome back!</h1>
      <p className="text-gray-600 mb-4">Manage and monitor all your sensors</p>
      {sensors ? (
        <>
          <SensorList sensorList={sensors} sensorSearch={handleSearch} refetchSensors={refetchSensors} />
          {sensors.length > 0 ? (
            <Pagination
              currentPage={page}
              nextPage={handleNextPage}
              previousPage={handlePreviousPage}
              more={hasMore}
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
