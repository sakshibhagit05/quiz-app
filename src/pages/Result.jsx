import { useNavigate, useLocation } from "react-router-dom";

function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const score = location.state?.score || 0;
  const total = location.state?.total || 0;

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          🎉 Quiz Completed
        </h1>

        <p className="text-gray-500 mb-1">Score</p>

        <p className="text-3xl font-bold text-blue-700 mb-6">
          {score} / {total}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 rounded-lg font-medium border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/student-login")}
            className="w-full px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;