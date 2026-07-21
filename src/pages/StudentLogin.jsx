import { useState } from "react";
import { useNavigate } from "react-router-dom";

const subjects = [
  "English",
  "Marathi",
  "Math",
  "शिष्यवृत्ती मराठी",
  "शिष्यवृत्ती गणित",
  "शिष्यवृत्ती इंग्रजी",
  "शिष्यवृत्ती बुद्धिमता",
  "3री मराठी",
  "3री परिसर अभ्यास",
];

function StudentJoin() {
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [subject, setSubject] = useState("");

  const handleStartQuiz = (e) => {
    e.preventDefault();

    // Save student details — passed along for the quiz to use
    const studentDetails = { studentName, subject };
    console.log("Student details:", studentDetails);

    navigate("/quiz", { state: studentDetails });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-800 px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Student Quiz
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Enter your details to begin
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleStartQuiz} className="space-y-5">
          <div>
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student Name
            </label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <select
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            >
              <option value="" disabled>
                Select subject
              </option>
              {subjects.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}

export default StudentJoin;