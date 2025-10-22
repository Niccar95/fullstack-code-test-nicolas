import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto flex flex-col items-center justify-center h-screen w-screen md:w-[1200px] p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-700 mb-4">Woopsie!</h1>
        <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-6">An unexpected error occurred</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-[#4B4A7F] text-white font-semibold rounded hover:bg-[#3d3a66] transition"
        >
          Go Home
        </button>
      </div>
    </section>
  );
};

export default Error;
